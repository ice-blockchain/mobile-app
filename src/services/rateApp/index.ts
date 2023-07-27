// SPDX-License-Identifier: ice License 1.0

import * as StoreReview from 'react-native-store-review';

export const rateApp = () => {
  return StoreReview.requestReview();
};
