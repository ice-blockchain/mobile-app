// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const SCREEN_SIDE_OFFSET = rem(23);

export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.mariner,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
    elevation: 4,
  },
});
