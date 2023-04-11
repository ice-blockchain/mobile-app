// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const lastUsedInAppLocaleSelector = (state: RootState) =>
  state.locale?.lastUsedInAppLocale;

export const lastUsedPhoneLocaleSelector = (state: RootState) =>
  state.locale?.lastUsedPhoneLocale;
