// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {ContextualMenuButton} from '@screens/Modals/ContextualMenu/types';
import {Coordinates} from '@screens/Modals/types';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress?: () => void;
  coordinates: Coordinates;
  buttons: ContextualMenuButton[];
  style?: ViewStyle;
};

export const ROUNDED_TRIANGLE_SIZE = rem(24);
export const ROUNDED_TRIANGLE_OFFSET = rem(11);

export const Menu = memo(({coordinates, onPress, buttons, style}: Props) => {
  return (
    <View style={[styles.menu, commonStyles.shadow, coordinates, style]}>
      {buttons.map(button => (
        <Touchable
          key={button.label}
          style={styles.menuItem}
          onPress={() => {
            if (onPress) {
              onPress();
            }
            setTimeout(button.onPress, 100);
          }}>
          {button.icon && (
            <View style={styles.menuItemIcon}>{button.icon}</View>
          )}
          <Text style={styles.menuItemText}>{button.label}</Text>
        </Touchable>
      ))}
      <RoundedTriangle
        fill={COLORS.white}
        width={ROUNDED_TRIANGLE_SIZE}
        height={ROUNDED_TRIANGLE_SIZE}
        style={styles.arrow}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  menu: {
    backgroundColor: COLORS.white,
    paddingVertical: rem(10),
    borderRadius: rem(20),
    position: 'absolute',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: rem(8),
    paddingHorizontal: rem(20),
  },
  menuItemIcon: {
    width: rem(24),
    height: rem(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    marginLeft: rem(12),
    ...font(17, null, 'semibold', 'downriver'),
  },
  arrow: {
    position: 'absolute',
    right: rem(5),
    top: -ROUNDED_TRIANGLE_OFFSET,
  },
});
