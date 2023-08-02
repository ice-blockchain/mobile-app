// SPDX-License-Identifier: ice License 1.0

import {RateData, User} from '@api/user/types';
import {ENV} from '@constants/env';
import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {
  firstMiningDateSelector,
  isAuthorizedSelector,
  lastShowingDateSelector,
  showingsCountSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {
  call,
  CallEffect,
  put,
  SagaReturnType,
  select,
} from 'redux-saga/effects';

export function* checkRateAppConditionSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const user: SagaReturnType<typeof userSelector> = yield select(userSelector);

  const firstMiningDate: ReturnType<typeof firstMiningDateSelector> =
    yield select(firstMiningDateSelector);
  const lastShowingDate: ReturnType<typeof lastShowingDateSelector> =
    yield select(lastShowingDateSelector);
  const showingsCount: ReturnType<typeof showingsCountSelector> = yield select(
    showingsCountSelector,
  );

  if (!isAppActive || !isAuthorized) {
    return;
  }

  const timeouts = ENV.RATE_THE_ADD_TIMEOUT_MINUTES;
  if (timeouts) {
    const shouldShowRateApp =
      showingsCount < timeouts.length &&
      dayjs().diff(lastShowingDate ?? firstMiningDate, 'minute') >=
        timeouts[showingsCount];

    if (user && shouldShowRateApp) {
      const params: RateData = {
        lastShowingDate: dayjs().toISOString(),
        showingsCount: showingsCount + 1,
      };

      yield call(updateRateData, user, params);
      yield put(RateAppActions.SHOW_RATE_APP.START.create());
    }
  }
}

function* updateRateData(user: User, params?: RateData) {
  if (params) {
    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          clientData: {
            ...(user.clientData ?? {}),
            rate: {...params},
          },
        },
        function* (
          freshUser,
        ): Generator<CallEffect<void>, {retry: boolean}, void> {
          if (
            freshUser.clientData?.rate?.firstMiningDate !==
              params?.firstMiningDate ||
            freshUser.clientData?.rate?.showingsCount !==
              params?.showingsCount ||
            freshUser.clientData?.rate?.lastShowingDate !==
              params?.lastShowingDate
          ) {
            yield call(updateRateData, freshUser, params);
          }
          return {retry: false};
        },
      ),
    );
  }
}
