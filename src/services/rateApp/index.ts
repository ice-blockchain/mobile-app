// SPDX-License-Identifier: ice License 1.0

import * as StoreReview from 'react-native-store-review';

export const rateApp = () => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      StoreReview.requestReview();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
