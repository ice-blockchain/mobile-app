// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const firstSignInTimeSelector = (state: RootState) =>
  state.creativeLibrary.firstSignInTime;
export const showedCreativeLibrarySelector = (state: RootState) =>
  state.creativeLibrary.showedCreativeLibrary;
