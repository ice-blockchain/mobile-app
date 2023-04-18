// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {checkProp} from '@utils/guards';
import Share, {ShareSingleOptions} from 'react-native-share';
import {isAndroid, isIOS} from 'rn-units';

export const shareSingle = async (options: ShareSingleOptions) => {
  try {
    await Share.shareSingle(options);
  } catch (error) {
    if (isShareProviderNotInstalled(error)) {
      return;
    }
    logError(error);
  }
};

const isShareProviderNotInstalled = (error: unknown) => {
  if (
    isAndroid &&
    checkProp(error, 'error') &&
    typeof error.error === 'string' &&
    error.error.includes('No Activity found to handle Intent')
  ) {
    return true;
  } else if (
    isIOS &&
    checkProp(error, 'code') &&
    error.code === 'ECOM.RNSHARE1'
  ) {
    return true;
  }
  return false;
};
