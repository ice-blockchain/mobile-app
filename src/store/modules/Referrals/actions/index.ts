// SPDX-License-Identifier: ice License 1.0

import {ReferralHistoryRecord, Referrals} from '@api/referrals/types';
import {ReferralType} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_REFERRALS = ({referralType = 'T1'}: {referralType?: ReferralType}) =>
  createAction(
    'GET_REFERRALS',
    {
      START: ({isInitial}: {isInitial: boolean}) => ({
        referralType,
        isInitial,
      }),
      SUCCESS: ({
        isInitial,
        result,
        nextOffset,
      }: {
        isInitial: boolean;
        result: Referrals;
        nextOffset: number;
      }) => ({
        referralType,
        isInitial,
        nextOffset,
        result,
      }),
      FAILED: (errorMessage: string) => ({
        errorMessage,
      }),
    },
    {isMultiInstanceProcess: true},
  );

const GET_REFERRALS_HISTORY = createAction('GET_REFERRALS_HISTORY', {
  START: () => {},
  SUCCESS: (history: ReferralHistoryRecord[]) => ({history}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const PING_REFERRAL = createAction(
  'REFERRALS/PING_REFERRAL',
  {
    START: (payload: {userId: string}) => payload,
    SUCCESS: (payload: {userId: string}) => payload,
    FAILED: (payload: {userId: string; errorMessage: string}) => payload,
  },
  {
    isMultiInstanceProcess: true,
  },
);

const PING_FRIENDS = createAction('REFERRALS/PING_FRIENDS', {
  START: () => {},
  RESET: true,
});

const UPDATE_PING_COUNTER = createAction('REFERRALS/UPDATE_PING_COUNTER', {
  STATE: true,
});

export const ReferralsActions = Object.freeze({
  GET_REFERRALS,
  GET_REFERRALS_HISTORY,
  PING_FRIENDS,
  PING_REFERRAL,
  UPDATE_PING_COUNTER,
});
