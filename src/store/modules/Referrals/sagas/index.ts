// SPDX-License-Identifier: ice License 1.0

import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getReferralsHistorySaga} from '@store/modules/Referrals/sagas/getReferralsHistorySaga';
import {getReferralsSaga} from '@store/modules/Referrals/sagas/getReferralsSaga';
import {pingUserSaga} from '@store/modules/Referrals/sagas/pingUserSaga';
import {takeLeadingEveryUnique} from '@store/utils/sagas/effects';
import {takeLeading} from 'redux-saga/effects';

export const referralsWatchers = [
  takeLeadingEveryUnique(
    ReferralsActions.GET_REFERRALS({})(null).START.type,
    getReferralsSaga,
  ),
  takeLeading(
    ReferralsActions.GET_REFERRALS_HISTORY.START.type,
    getReferralsHistorySaga,
  ),
  takeLeadingEveryUnique(
    ReferralsActions.PING_REFERRAL(null).START.type,
    pingUserSaga,
  ),
];
