// SPDX-License-Identifier: BUSL-1.1

import profile from './profile';
import accounts from './accounts';
import validations from './validations';
import statistics from './statistics';
import referrals from './referrals';

const Api = Object.freeze({
  profile,
  accounts,
  statistics,
  referrals,
  validations,
});

export default Api;
