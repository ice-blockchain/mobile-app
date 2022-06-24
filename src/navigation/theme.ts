// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {DefaultTheme} from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};
