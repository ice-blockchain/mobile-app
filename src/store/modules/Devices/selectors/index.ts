// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const deviceUniqueIdSelector = (state: RootState) =>
  state.devices.deviceUniqueId as string;

export const deviceLocationSelector = (state: RootState) =>
  state.devices.location;

export const lastMetadataUpdateSelector = (state: RootState) =>
  state.devices.lastMetadataUpdateAt;
