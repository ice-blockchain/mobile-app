// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const socialsByUserIdSelector =
  (userId: string) => (state: RootState) => {
    return state.socials.items[userId] || [];
  };
