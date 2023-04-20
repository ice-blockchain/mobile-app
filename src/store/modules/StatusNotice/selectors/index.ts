// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const statusNoticeDataSelector = (state: RootState) =>
  state.statusNotice.data;

export const statusNoticeHeightSelector = (state: RootState) =>
  state.statusNotice.statusNoticeHeight;
