// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {openLink} from '@utils/device';
import {checkProp} from '@utils/guards';
// eslint-disable-next-line no-restricted-imports
import Share, {
  ShareOptions,
  ShareSingleOptions,
  Social as SocialType,
} from 'react-native-share';
import {isAndroid, isIOS} from 'rn-units';

export const shareSMS = async (phoneNumber: string, message: string) => {
  const url = `sms:${phoneNumber}&body=${message}`;

  const shareOptions = {
    message: message,
    social: Share.Social.SMS,
    recipient: phoneNumber,
  };
  /** For android we use react-native-share library
   * to avoid showing 'Open with' dialog that shows messenger apps
   */
  if (isAndroid) {
    return await shareSingle(shareOptions);
  } else {
    return await openLink(url);
  }
};

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

export const openShareDialog = async (options: ShareOptions) => {
  try {
    await Share.open({failOnCancel: false, ...options});
  } catch (error) {
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
    checkProp(error, 'error') &&
    checkProp(error.error, 'code') &&
    error.error.code === 'ECOM.RNSHARE1'
  ) {
    return true;
  }
  return false;
};

export const Social = SocialType;
