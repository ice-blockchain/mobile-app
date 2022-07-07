// SPDX-License-Identifier: BUSL-1.1

import {ReferralType} from '@api/referrals/types';
import {ReferralHistory} from '@store/modules/Referrals/reducer';
import {createAction} from '@store/utils/actions/createAction';

const GET_REFERRALS = createAction('GET_TOP_COUNTRIES', {
  START: (userId: string, type: ReferralType) => ({userId, type}),
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const GET_REFERRALS_HISTORY_BY_USER_ID = createAction(
  'GET_REFERRALS_HISTORY_BY_USER_ID',
  {
    START: (userId: string) => ({userId}),
    SUCCESS: (history: ReferralHistory[]) => ({history}),
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
);

export const ReferralsActions = Object.freeze({
  GET_REFERRALS,
  GET_REFERRALS_HISTORY_BY_USER_ID,
});
