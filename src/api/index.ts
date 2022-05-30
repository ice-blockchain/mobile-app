// SPDX-License-Identifier: BUSL-1.1

import {accounts} from './accounts';
import {profile} from './profile';
import {referrals} from './referrals';
import {statistics} from './statistics';
import {validations} from './validations';

export const Api = Object.freeze({
  profile,
  accounts,
  statistics,
  referrals,
  validations,
});
