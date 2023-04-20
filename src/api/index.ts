// SPDX-License-Identifier: ice License 1.0

import {achievements} from '@api/achievements';
import {devices} from '@api/devices';
import {news} from '@api/news';
import {notifications} from '@api/notifications';
import {referrals} from '@api/referrals';
import {statistics} from '@api/statistics';
import {statusNotice} from '@api/statusNotice';
import {tasks} from '@api/tasks';
import {time} from '@api/time';
import {tokenomics} from '@api/tokenomics';
import {user} from '@api/user';
import {validations} from '@api/validations';

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
  statusNotice,
  tasks,
  time,
});
