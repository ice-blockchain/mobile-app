// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Dimensions, StyleSheet} from 'react-native';
import {isIOS, rem, screenHeight} from 'rn-units';

export const SCREEN_SIDE_OFFSET = rem(20);
export const POPUP_SIDE_OFFSET = rem(16);

export const commonStyles = StyleSheet.create({
  baseSubScreen: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
    flexGrow: 1,
  },
  shadow: isIOS
    ? {
        shadowColor: COLORS.mariner,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.15,
      }
    : {elevation: 4},
  flexOne: {flex: 1},
  darkText: {color: COLORS.primaryDark},
});

export const SMALL_BUTTON_HIT_SLOP = {top: 4, left: 4, bottom: 4, right: 4};
export const MIDDLE_BUTTON_HIT_SLOP = {
  top: 12,
  left: 32,
  bottom: 12,
  right: 32,
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const smallHeightDevice = screenHeight < 680;
