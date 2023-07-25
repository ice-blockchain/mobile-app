// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {
  firstMiningDateSelector,
  firstRateShowingDateSelector,
  secondRateShowingDateSelector,
  thirdRateShowingDateSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {RateAppActions} from '@store/modules/RateApp/actions';
import {RateAppSelectors} from '@store/modules/RateApp/selectors';
import {put, SagaReturnType, select} from 'redux-saga/effects';

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

  let isRateAppShown: SagaReturnType<typeof RateAppSelectors.isRateAppShown> =
    yield select(RateAppSelectors.isRateAppShown);

  isRateAppShown = yield select(RateAppSelectors.isRateAppShown);

  /** Show if it hasn't been shown before after 10 days of first mining happened  */
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

  if (showFirstTime || showSecondTime || showThirdTime) {
    yield put(RateAppActions.SHOW_RATE_APP.START.create());
  }
}
