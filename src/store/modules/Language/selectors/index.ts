// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const lastUsedInAppLanguageSelector = (state: RootState) =>
  state.language?.lastUsedInAppLanguage;

export const lastUsedPhoneLanguageSelector = (state: RootState) =>
  state.language?.lastUsedPhoneLanguage;
