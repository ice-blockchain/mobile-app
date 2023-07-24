// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {navigationRef} from '@navigation/utils';
import {
  isRegistrationCompleteSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {openBonusClaimed} from '@store/modules/Tokenomics/utils/openBonusClaimed';
import {openBonusExpired} from '@store/modules/Tokenomics/utils/openBonusExpired';
import {openClaimBonus} from '@store/modules/Tokenomics/utils/openClaimBonus';
import {waitForSelector} from '@store/utils/sagas/effects';
import {showError} from '@utils/errors';
import {SagaIterator} from 'redux-saga';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

export function* handleExtraBonusSaga(
  action: ReturnType<
    typeof TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.create
  >,
): SagaIterator {
  const miningSummary: ReturnType<typeof miningSummarySelector> = yield select(
    miningSummarySelector,
  );

  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  try {
    if (miningSummary?.availableExtraBonus) {
      yield call(waitForSelector, isRegistrationCompleteSelector);
      yield call(waitForSelector, isSplashHiddenSelector);

      const result: SagaReturnType<typeof openClaimBonus> = yield call(
        openClaimBonus,
      );

      if (result === 'no') {
        return;
      }

      const extraBonus: SagaReturnType<typeof Api.tokenomics.claimExtraBonus> =
        yield call(Api.tokenomics.claimExtraBonus, {userId});

      yield put(TokenomicsActions.GET_MINING_SUMMARY.START.create());

      yield call(AnalyticsEventLogger.trackClaimBonus, {
        claimBonusResult: 'Success',
      });
      yield call(openBonusClaimed, {
        claimedBonus: extraBonus.availableExtraBonus,
      });
    } else if (action.payload.claimDailyBonus) {
      /**
       * If we explicitly want to a claim daily bonus
       * E.g. by pressing a daily-bonus push notification
       */
      yield call(handleBonusExpired);
    }
  } catch (error) {
    if (isApiError(error, 409, 'EXTRA_BONUS_ALREADY_CLAIMED')) {
      navigationRef.goBack(); // close the modal
      return;
    } else if (isApiError(error, 404, 'NO_EXTRA_BONUS_AVAILABLE')) {
      yield call(handleBonusExpired);
      return;
    }

    yield spawn(showError, error);
    yield call(handleExtraBonusSaga, action);
    throw error;
  }
}

function* handleBonusExpired() {
  yield call(AnalyticsEventLogger.trackClaimBonus, {
    claimBonusResult: 'Expired',
  });
  yield call(openBonusExpired);
}
