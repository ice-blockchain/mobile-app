// SPDX-License-Identifier: ice License 1.0

import {achievements} from './achievements';
import {devices} from './devices';
import {news} from './news';
import {notifications} from './notifications';
import {referrals} from './referrals';
import {statistics} from './statistics';
import {tasks} from './tasks';
import {time} from './time';
import {tokenomics} from './tokenomics';
import {user} from './user';
import {validations} from './validations';

export const Api = Object.freeze({
  achievements,
  user,
  statistics,
  referrals,
  validations,
  devices,
  tokenomics,
  news,
  notifications,
  tasks,
  time,
});
