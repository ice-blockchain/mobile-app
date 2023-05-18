// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {ResurrectRequiredData} from '@api/tokenomics/types';
import {LocalAudio} from '@audio';
import {ENV} from '@constants/env';
import {navigationRef} from '@navigation/utils';
import {loadLocalAudio} from '@services/audio';
import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {shareSocialsSaga} from '@store/modules/Socials/sagas/shareSocials';
import {SocialsShareResult} from '@store/modules/Socials/types';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {
  agreeWithEarlyAccessSelector,
  forceStartMiningSelector,
  isMiningActiveSelector,
} from '@store/modules/Tokenomics/selectors';
import {openConfirmResurrect} from '@store/modules/Tokenomics/utils/openConfirmResurrect';
import {openConfirmResurrectNo} from '@store/modules/Tokenomics/utils/openConfirmResurrectNo';
import {openConfirmResurrectYes} from '@store/modules/Tokenomics/utils/openConfirmResurrectYes';
import {openEarlyAccess} from '@store/modules/Tokenomics/utils/openEarlyAccess';
import {openMiningNotice} from '@store/modules/Tokenomics/utils/openMiningNotice';
import {hapticFeedback} from '@utils/device';
import {getErrorMessage, showError} from '@utils/errors';
import {call, delay, put, SagaReturnType, select} from 'redux-saga/effects';

export function* startMiningSessionSaga(
  action: ReturnType<
    typeof TokenomicsActions.START_MINING_SESSION.START.create
  >,
) {
  if (ENV.SHOW_MINING_NOTICE) {
    yield call(openMiningNotice);
    return;
  }
  const forceStartMining: ReturnType<typeof forceStartMiningSelector> =
    yield select(forceStartMiningSelector);

  if (forceStartMining) {
    yield put(
      TokenomicsActions.UPDATE_FORCE_START_MINING.STATE.create({
        forceStartMining: false,
      }),
    );
  } else {
    /**
     * Check if we can show mining popup before we start/resume mining
     */
    const result: SocialsShareResult = yield call(shareSocialsSaga);

    if (result.status === 'opened') {
      yield put(
        TokenomicsActions.UPDATE_FORCE_START_MINING.STATE.create({
          forceStartMining: true,
        }),
      );
      return;
    }
  }

  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const agreeWithEarlyAccess: ReturnType<typeof agreeWithEarlyAccessSelector> =
    yield select(agreeWithEarlyAccessSelector);

  try {
    const miningSummary: SagaReturnType<
      typeof Api.tokenomics.startMiningSession
    > = yield call(Api.tokenomics.startMiningSession, {
      userId,
      resurrect: action.payload?.resurrect,
    });
    yield put(
      TokenomicsActions.START_MINING_SESSION.SUCCESS.create(miningSummary),
    );

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

    if (action.payload?.tapToMineActionType) {
      AnalyticsEventLogger.trackTapToMine({
        tapToMineActionType: action.payload?.tapToMineActionType,
      });
    }

    if (!agreeWithEarlyAccess) {
      /*
       * We use Asia/Dubai timezone for release
       */
      const currentTime: SagaReturnType<typeof Api.time.getCurrentTime> =
        yield call(Api.time.getCurrentTime, 'Asia/Dubai');

      const releaseDate = dayjs(ENV.RELEASE_DATE);
      const currentDate = dayjs(currentTime.data?.dateTime);

      /*
       * Release not happened
       */
      if (releaseDate.isAfter(currentDate)) {
        yield delay(500);
        const agreeResult: SagaReturnType<typeof openEarlyAccess> = yield call(
          openEarlyAccess,
        );

        if (agreeResult === 'yes') {
          yield put(
            TokenomicsActions.UPDATE_AGREE_WITH_EARLY_ACCESS.STATE.create(),
          );
        }
        navigationRef.goBack();
      }
    }
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
      showError(error);
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

  const miningSummary: SagaReturnType<typeof Api.tokenomics.getMiningSummary> =
    yield call(Api.tokenomics.getMiningSummary, {userId});

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
