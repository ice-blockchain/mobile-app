// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';
import {rem, screenHeight} from 'rn-units';

const DESIGN_SCREEN_HEIGHT = 812;

export const IS_SMALL_SCREEN = DESIGN_SCREEN_HEIGHT > screenHeight;

export const SCREEN_SIDE_OFFSET = rem(23);

export const commonStyles = StyleSheet.create({
  baseSubScreen: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    flexGrow: 1,
  },
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

export const SMALL_BUTTON_HIT_SLOP = {top: 4, left: 4, bottom: 4, right: 4};
