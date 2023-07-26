// SPDX-License-Identifier: ice License 1.0

import {RateData, User} from '@api/user/types';
import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {
  firstMiningDateSelector,
  firstRateShowingDateSelector,
  secondRateShowingDateSelector,
  thirdRateShowingDateSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {RateAppSelectors} from '@store/modules/RateApp/selectors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const FIRST_APPEAR_DAYS = 10;
const SECOND_APPEAR_DAYS = 35;
const THIRD_APPEAR_DAYS = 35;

export function* checkRateAppConditionSaga() {
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );

  const firstMiningDate: ReturnType<typeof firstMiningDateSelector> =
    yield select(firstMiningDateSelector);
  const firstRateShowingDate: ReturnType<typeof firstRateShowingDateSelector> =
    yield select(firstRateShowingDateSelector);
  const secondRateShowingDate: ReturnType<
    typeof secondRateShowingDateSelector
  > = yield select(secondRateShowingDateSelector);
  const thirdRateShowingDate: ReturnType<typeof thirdRateShowingDateSelector> =
    yield select(thirdRateShowingDateSelector);

  if (!isAppActive) {
    return;
  }

  const user: User = yield select(unsafeUserSelector);

  let isRateAppShown: SagaReturnType<typeof RateAppSelectors.isRateAppShown> =
    yield select(RateAppSelectors.isRateAppShown);

  isRateAppShown = yield select(RateAppSelectors.isRateAppShown);

  /** Show if it hasn't been shown before (after 10 days of first mining happened)  */
  const showFirstTime =
    !isRateAppShown &&
    firstMiningDate &&
    !firstRateShowingDate &&
    dayjs().diff(firstMiningDate, 'day') >= FIRST_APPEAR_DAYS;

  /** Show 35 days after first showing happened  */
  const showSecondTime =
    isRateAppShown &&
    firstRateShowingDate &&
    !secondRateShowingDate &&
    dayjs().diff(firstMiningDate, 'day') >=
      FIRST_APPEAR_DAYS + SECOND_APPEAR_DAYS;

  /** Show 35 days after second showing happened  */
  const showThirdTime =
    isRateAppShown &&
    secondRateShowingDate &&
    !thirdRateShowingDate &&
    dayjs().diff(firstMiningDate, 'day') >=
      FIRST_APPEAR_DAYS + SECOND_APPEAR_DAYS + THIRD_APPEAR_DAYS;

  if (user && (showFirstTime || showSecondTime || showThirdTime)) {
    let params: RateData = {};
    if (user.clientData?.rate) {
      params = {...user.clientData.rate};
    }

    if (showFirstTime) {
      params.firstRateShowingDate = dayjs().toISOString();
    } else if (showSecondTime) {
      params.secondRateShowingDate = dayjs().toISOString();
    } else if (showThirdTime) {
      params.thirdRateShowingDate = dayjs().toISOString();
    }

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
