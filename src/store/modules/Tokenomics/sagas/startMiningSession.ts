// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {ResurrectRequiredData} from '@api/tokenomics/types';
import {User} from '@api/user/types';
import {LocalAudio} from '@audio';
import {navigate, removeScreenByName} from '@navigation/utils';
import {loadLocalAudio} from '@services/audio';
import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {
  authConfigSelector,
  firstMiningDateSelector,
  unsafeUserSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {emotionsAuthStatusSelector} from '@store/modules/FaceRecognition/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {
  isMiningActiveSelector,
  tapToMineActionTypeSelector,
} from '@store/modules/Tokenomics/selectors';
import {openConfirmResurrect} from '@store/modules/Tokenomics/utils/openConfirmResurrect';
import {openConfirmResurrectNo} from '@store/modules/Tokenomics/utils/openConfirmResurrectNo';
import {openConfirmResurrectYes} from '@store/modules/Tokenomics/utils/openConfirmResurrectYes';
import {hapticFeedback} from '@utils/device';
import {getErrorMessage, showError} from '@utils/errors';
import {
  call,
  CallEffect,
  put,
  SagaReturnType,
  select,
  spawn,
} from 'redux-saga/effects';

export function* startMiningSessionSaga(
  action: ReturnType<
    typeof TokenomicsActions.START_MINING_SESSION.START.create
  >,
) {
  const emotionsAuthStatus: ReturnType<typeof emotionsAuthStatusSelector> =
    yield select(emotionsAuthStatusSelector);
  const authConfig: ReturnType<typeof authConfigSelector> = yield select(
    authConfigSelector,
  );
  const user: ReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );
  if (
    emotionsAuthStatus !== 'SUCCESS' &&
    authConfig?.['face-auth']?.enabled &&
    !!user?.clientData?.rate?.firstMiningDate // allowing to mine 1st time without face recognition
  ) {
    yield removeScreenByName('Tooltip');
    navigate({
      name: 'FaceRecognition',
      params: undefined,
    });
    return;
  }

  const tapToMineActionType: ReturnType<typeof tapToMineActionTypeSelector> =
    yield select(tapToMineActionTypeSelector);

  try {
    const miningSummary: SagaReturnType<
      typeof Api.tokenomics.startMiningSession
    > = yield call(Api.tokenomics.startMiningSession, {
      userId: user.id,
      resurrect: action.payload?.resurrect,
    });
    yield put(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.create(miningSummary),
    );
    // Reset success emotions auth status here so on next tap to mine a user would have to face auth again
    yield put(
      FaceRecognitionActions.RESET_EMOTIONS_SUCCESS_AUTH_STATUS.STATE.create(),
    );

    yield call(setFirstMiningDate, user);

    /**
     * play sound and vibrate after mining started successfully
     */

    const audio: SagaReturnType<typeof loadLocalAudio> = yield call(
      loadLocalAudio,
      LocalAudio.extendMining,
    );

    hapticFeedback();
    if (audio) {
      audio.play();
    }

    AnalyticsEventLogger.trackTapToMine({
      tapToMineActionType: tapToMineActionType ?? 'Default',
    });
  } catch (error) {
    yield put(
      TokenomicsActions.START_MINING_SESSION.FAILED.create(
        getErrorMessage(error),
      ),
    );
    if (
      isApiError(error, 400, 'RACE_CONDITION') ||
      isApiError(error, 409, 'MINING_IN_PROGRESS')
    ) {
      yield processRaceCondition(action);
    } else if (isApiError(error, 409, 'RESURRECTION_DECISION_REQUIRED')) {
      const errorData = error?.response?.data?.data;
      yield confirmResurrect({
        amount: typeof errorData?.amount === 'string' ? errorData.amount : '',
        duringTheLastXSeconds:
          typeof errorData?.duringTheLastXSeconds === 'number'
            ? errorData.duringTheLastXSeconds
            : 0,
      });
    } else {
      yield spawn(showError, error);
    }
    throw error;
  }
}

function* processRaceCondition({
  payload,
}: ReturnType<typeof TokenomicsActions.START_MINING_SESSION.START.create>) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const {
    data: miningSummary,
  }: SagaReturnType<typeof Api.tokenomics.getMiningSummary> = yield call(
    Api.tokenomics.getMiningSummary,
    {userId},
  );

  yield put(
    TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.create({miningSummary}),
  );

  const isMiningActive: ReturnType<typeof isMiningActiveSelector> =
    yield select(isMiningActiveSelector);

  if (!isMiningActive) {
    yield put(TokenomicsActions.START_MINING_SESSION.START.create(payload));
  }
}

function* confirmResurrect(
  params: ResurrectRequiredData,
): Generator<unknown, void, 'yes' | 'no'> {
  const mainConfirmResult: SagaReturnType<typeof openConfirmResurrect> =
    yield call(openConfirmResurrect, params);

  const warningConfirmResult =
    mainConfirmResult === 'yes'
      ? yield call(openConfirmResurrectYes, params)
      : yield call(openConfirmResurrectNo, params);

  if (warningConfirmResult === 'yes') {
    yield put(
      AnalyticsActions.UPDATE_RESURRECT_RESPONSE_TYPE.START.create({
        resurrectResponseType:
          mainConfirmResult === 'yes' ? 'accepted' : 'denied',
      }),
    );
    yield put(
      TokenomicsActions.START_MINING_SESSION.START.create({
        resurrect: mainConfirmResult === 'yes',
      }),
    );
  } else {
    yield call(confirmResurrect, params);
  }
}

function* setFirstMiningDate(user: User) {
  const firstMiningDate: ReturnType<typeof firstMiningDateSelector> =
    yield select(firstMiningDateSelector);
  if (!firstMiningDate) {
    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...(user.clientData ?? {}),
            rate: {firstMiningDate: dayjs().toISOString()},
          },
        },
        function* (
          freshUser,
        ): Generator<CallEffect<void>, {retry: boolean}, void> {
          if (freshUser.clientData?.rate?.firstMiningDate !== firstMiningDate) {
            yield call(setFirstMiningDate, freshUser);
          }
          return {retry: false};
        },
      ),
    );
  }
}
