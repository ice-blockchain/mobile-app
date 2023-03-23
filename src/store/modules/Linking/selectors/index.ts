// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const handledUrlSelector = (state: RootState) =>
  state.linking.handledUrl;
