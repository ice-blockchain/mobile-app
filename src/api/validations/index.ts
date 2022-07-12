// SPDX-License-Identifier: BUSL-1.1

import {phoneValidation} from './phoneValidation';
import {validateUsername} from './validateUsername';

export const validations = Object.freeze({
  validateUsername,
  phoneValidation,
});
