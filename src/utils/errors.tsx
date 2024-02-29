// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';

export const getErrorMessage = (error: unknown): string => {
  if (checkProp(error, 'message')) {
    return String(error.message);
  } else if (typeof error === 'string') {
    return error;
  }
  return t('errors.unknown_error');
};

export const showError = (error: unknown) => {
  console.log(error);
};
