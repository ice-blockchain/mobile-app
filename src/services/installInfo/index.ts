// SPDX-License-Identifier: ice License 1.0

import {PlayInstallReferrer} from 'react-native-play-install-referrer';
import {isIOS} from 'rn-units';

export const getInstallReferrer = () => {
  return new Promise<string | null>((resolve, reject) => {
    if (isIOS) {
      return resolve(null);
    }

    PlayInstallReferrer.getInstallReferrerInfo((installReferrerInfo, error) => {
      if (!error) {
        resolve(
          installReferrerInfo ? installReferrerInfo.installReferrer : null,
        );
      } else {
        reject(error);
      }
    });
  });
};
