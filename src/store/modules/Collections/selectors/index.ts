// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const collectionSelector =
  <T extends keyof RootState['collections']>(key: T) =>
  (state: RootState) =>
    state.collections[key];
