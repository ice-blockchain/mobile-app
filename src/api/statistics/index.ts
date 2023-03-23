// SPDX-License-Identifier: ice License 1.0

import {getAdoption} from './getAdoption';
import {getTopCountries} from './getTopCountries';
import {getTopMiners} from './getTopMiners';
import {getUserGrowth} from './getUserGrowth';

export const statistics = Object.freeze({
  getTopCountries,
  getTopMiners,
  getUserGrowth,
  getAdoption,
});
