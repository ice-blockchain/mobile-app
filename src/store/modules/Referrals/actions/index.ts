// SPDX-License-Identifier: BUSL-1.1

import {Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_REFERRALS = createAction(
  'GET_REFERRALS',
  {
    START: (userId: string, referralType: ReferralType, offset: number) => ({
      userId,
      referralType,
      offset,
    }),
    SUCCESS: (
      userId: string,
      referralType: ReferralType,
      offset: number,
      result: Referrals,
    ) => ({userId, referralType, offset, result}),
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
  {isMultiInstanceProcess: true},
);

const GET_REFERRALS_HISTORY = createAction('GET_REFERRALS_HISTORY', {
  START: (userId: string) => ({userId}),
  SUCCESS: (history: {date: string; t1: number; t2: number}[]) => ({history}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const ReferralsActions = Object.freeze({
  GET_REFERRALS,
  GET_REFERRALS_HISTORY,
});
