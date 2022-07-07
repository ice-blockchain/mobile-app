// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const deviceSettingsSelector = (state: RootState) =>
  state.devices.settings;
