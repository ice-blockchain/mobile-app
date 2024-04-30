// SPDX-License-Identifier: ice License 1.0

import {Time} from '@api/time/types';
import axios from 'axios';

export function getCurrentTime(timeZone: string) {
  return axios.get<Time>(
    `https://www.timeapi.io/api/Time/current/zone?timeZone=${timeZone}`,
  );
}
