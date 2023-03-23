// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

const isRateAppShown = (state: RootState) => state.rateApp.isRateAppShown;

export const RateAppSelectors = Object.freeze({
  isRateAppShown,
});
