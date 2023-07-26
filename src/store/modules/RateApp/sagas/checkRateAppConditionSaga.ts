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
import {call, put, select} from 'redux-saga/effects';

const APPEAR_DAYS_ORDER = [10, 35, 35];

export function* checkRateAppConditionSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );

  const user: User = yield select(userSelector);

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

  const shouldShowRateApp =
    showingsCount !== APPEAR_DAYS_ORDER.length - 1 &&
    dayjs().diff(
      lastShowingDate ?? firstMiningDate,
      ENV.STAGING_ENV ? 'minute' : 'day',
    ) >= APPEAR_DAYS_ORDER[showingsCount];

  if (user && shouldShowRateApp) {
    let params: RateData = {};
    params.lastShowingDate = dayjs().toISOString();
    params.showingsCount = showingsCount + 1;

    yield call(updateRateData, user, params);
    yield put(RateAppActions.SHOW_RATE_APP.START.create());
  }
}

function* updateRateData(user: User, params?: RateData) {
  if (params) {
    yield put(
      AccountActions.UPDATE_ACCOUNT.START.create({
        clientData: {
          ...(user.clientData ?? {}),
          rate: {...params},
        },
      }),
    );
  }
}
