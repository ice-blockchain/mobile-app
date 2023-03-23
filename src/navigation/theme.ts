// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {DefaultTheme} from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};
