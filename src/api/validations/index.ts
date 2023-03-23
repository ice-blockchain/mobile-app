// SPDX-License-Identifier: ice License 1.0

import {validateEmail} from './validateEmail';
import {validatePhoneNumber} from './validatePhoneNumber';

export const validations = Object.freeze({
  validateEmail,
  validatePhoneNumber,
});
