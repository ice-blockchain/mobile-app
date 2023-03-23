// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {navigationRef} from '@navigation/utils';
import {
  isRegistrationCompleteSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {miningSummarySelector} from '@store/modules/Tokenomics/selectors';
import {openBonusClaimed} from '@store/modules/Tokenomics/utils/openBonusClaimed';
import {openBonusExpired} from '@store/modules/Tokenomics/utils/openBonusExpired';
import {openClaimBonus} from '@store/modules/Tokenomics/utils/openClaimBonus';
import {waitForSelector} from '@store/utils/sagas/effects';
import {showError} from '@utils/errors';
import {SagaIterator} from 'redux-saga';
import {call, delay, put, SagaReturnType, select} from 'redux-saga/effects';

export function* handleExtraBonusSaga(): SagaIterator {
  const miningSummary: ReturnType<typeof miningSummarySelector> = yield select(
    miningSummarySelector,
  );

  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  try {
    if (miningSummary?.availableExtraBonus) {
      yield call(waitForSelector, isRegistrationCompleteSelector);

      /**
       * Add small delay to let the main navigator to be displayed first.
       * This fixes the bug when on fresh install,
       * if a user gets availableExtraBonus during the welcome screens,
       * the dialog is not displayed after the registration complete
       */
      yield delay(1000);

      yield call(openClaimBonus);

      const extraBonus: SagaReturnType<typeof Api.tokenomics.claimExtraBonus> =
        yield call(Api.tokenomics.claimExtraBonus, {userId});

      yield put(
        TokenomicsActions.GET_MINING_SUMMARY.START.create({
          forceUpdate: true,
        }),
      );

      yield call(AnalyticsEventLogger.trackClaimBonus, {
        claimBonusResult: 'Success',
      });
      yield call(openBonusClaimed, {
        claimedBonus: extraBonus.availableExtraBonus,
      });
    }
  } catch (error) {
    if (isApiError(error, 409, 'EXTRA_BONUS_ALREADY_CLAIMED')) {
      navigationRef.goBack(); // close the modal
      return;
    } else if (isApiError(error, 404, 'NO_EXTRA_BONUS_AVAILABLE')) {
      yield call(AnalyticsEventLogger.trackClaimBonus, {
        claimBonusResult: 'Expired',
      });
      yield call(openBonusExpired);
      return;
    }

    yield call(showError, error);
    yield call(handleExtraBonusSaga);
    throw error;
  }
}
