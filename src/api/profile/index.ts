// SPDX-License-Identifier: BUSL-1.1

import {deleteProfile} from './deleteProfile';
import {getProfile} from './getProfile';
import {updateProfile} from './updateProfile';

export const profile = Object.freeze({
  getProfile,
  updateProfile,
  deleteProfile,
});
