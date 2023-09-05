// SPDX-License-Identifier: ice License 1.0

import React from 'react';
import {ImageRequireSource} from 'react-native';

export type PromoItemData = {
  topRightBackgroundImage: ImageRequireSource;
  backgroundColor: string;
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactElement;
};
