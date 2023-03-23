// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {LINKS} from '@constants/links';
import Rate, {AndroidMarket} from 'react-native-rate';

export const rateApp = () => {
  return new Promise<boolean>((resolve, reject) => {
    Rate.rate(
      {
        preferInApp: true,
        openAppStoreIfInAppFails: false,

        fallbackPlatformURL: LINKS.MAIN,

        // iOS
        AppleAppID: ENV.APPSTORE_APP_ID,

        // Android
        GooglePackageName: ENV.APP_ID,
        preferredAndroidMarket: AndroidMarket.Google,
      },
      (success, errorMessage) => {
        if (errorMessage) {
          reject(errorMessage);
        } else {
          resolve(success);
        }
      },
    );
  });
};
