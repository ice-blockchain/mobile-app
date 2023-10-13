// SPDX-License-Identifier: ice License 1.0

import {ReactNode} from 'react';

export type ContextualMenuButton = {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
  id?: 'help' | 'staking' | 'notifications' | 'stats' | 'boost';
};

export type Coordinates = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
