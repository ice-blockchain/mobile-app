// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  label: string;
  selected: boolean;
  preset: 'dark' | 'light';
  icon?: ReactNode;
  button?: ReactNode;
};

export const FilterButton = ({
  onPress,
  label,
  button,
  selected,
  preset,
  icon,
}: Props) => {
  let containerStyle;
  switch (preset) {
    case 'dark':
      containerStyle = selected
        ? styles.containerDarkActive
        : styles.containerDarkInactive;
      break;
    case 'light':
      containerStyle = selected
        ? styles.containerLightActive
        : styles.containerLightInactive;
  }
  return (
    <Touchable onPress={onPress} style={[styles.container, containerStyle]}>
      {!!icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.buttonLightText,
          preset === 'light' && !selected && styles.buttonDarkText,
        ]}>
        {label}
      </Text>
      {button}
    </Touchable>
  );
};

export const FilterButtonDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    height: rem(30),
    paddingHorizontal: rem(16),
    marginHorizontal: rem(4),
    borderRadius: rem(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerDarkInactive: {
    backgroundColor: COLORS.primaryDark,
  },
  containerDarkActive: {
    backgroundColor: COLORS.shamrock,
  },
  containerLightInactive: {
    backgroundColor: COLORS.secondaryFaint,
  },
  containerLightActive: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonLightText: {
    ...font(12, 17, 'medium'),
  },
  buttonDarkText: {
    ...font(12, 17, 'medium', 'secondary'),
  },
  icon: {
    marginRight: rem(4),
  },
  divider: {
    backgroundColor: COLORS.periwinkleGray,
    width: 1,
    marginHorizontal: rem(2),
  },
});
