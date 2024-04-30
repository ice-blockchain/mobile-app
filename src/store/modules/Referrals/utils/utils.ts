// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {ReferralsActions} from '@store/modules/Referrals/actions';

export function getIsInitialStartAction(referralType: ReferralType) {
  return {
    ...ReferralsActions.GET_REFERRALS({referralType})(referralType),
    START: {
      ...ReferralsActions.GET_REFERRALS({referralType})(referralType).START,
      create: () =>
        ReferralsActions.GET_REFERRALS({referralType})(
          referralType,
        ).START.create({isInitial: true}),
    },
  };
}
