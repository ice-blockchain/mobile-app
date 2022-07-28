// SPDX-License-Identifier: BUSL-1.1

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralsSaga} from '@store/modules/Referrals/sagas/getReferralsSaga';
import {takeLeadingEveryUnique} from '@store/utils/sagas/effects';

export function* rootReferralsSaga() {
  yield takeLeadingEveryUnique(
    ReferralsActions.GET_REFERRALS(null).START.type,
    getReferralsSaga,
  );
}
