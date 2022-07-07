// SPDX-License-Identifier: BUSL-1.1

import {devices} from './devices';
import {referrals} from './referrals';
import {statistics} from './statistics';
import {user} from './user';
import {validations} from './validations';

export const Api = Object.freeze({
  user,
  statistics,
  referrals,
  validations,
  devices,
});
