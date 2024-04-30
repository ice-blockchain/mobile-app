// SPDX-License-Identifier: ice License 1.0

import {isApiError, isNetworkError} from '@api/client';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {getAuthErrorMessage, isAuthError} from '@services/auth';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import React from 'react';

export const getErrorMessage = (error: unknown): string => {
  if (isAuthError(error)) {
    return getAuthErrorMessage(error);
  } else if (isNetworkError(error)) {
    return t('errors.network_error_message');
  } else if (isApiError(error)) {
    return t('errors.general_error_message');
  } else if (checkProp(error, 'message')) {
    return String(error.message);
  } else if (typeof error === 'string') {
    return error;
  }
  return t('errors.unknown_error');
};

export const showError = (error: unknown) => {
  let dismissResolve: () => void;
  const dismissPromise = new Promise<void>(r => (dismissResolve = r));
  navigate({
    /**
     * Setting a key to distinguish Error PopUp from other PopUps
     * to display them over each other instead of substitution
     */
    key: 'error-popup',
    name: 'PopUp',
    params: {
      imageProps: {source: Images.popUp.error},
      title: isNetworkError(error)
        ? t('errors.network_error_title')
        : t('errors.general_error_title'),
      message: getErrorMessage(error),
      buttons: [{text: t('button.try_again'), icon: <RestartIcon />}],
      onDismiss: () => dismissResolve(),
    },
  });
  return dismissPromise;
};
