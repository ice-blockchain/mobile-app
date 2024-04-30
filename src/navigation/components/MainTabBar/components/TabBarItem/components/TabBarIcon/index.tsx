// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  isFocused: boolean;
  icon: React.ReactNode;
  tabBarAccessibilityLabel?: string;
  onPress: () => void;
  onLongPress: () => void;
  tabBarTestID?: string;
  buttonStyle?: StyleProp<ViewStyle>;
};

export const TabBarIcon = ({
  isFocused,
  icon,
  tabBarAccessibilityLabel,
  onPress,
  onLongPress,
  tabBarTestID,
  buttonStyle,
}: Props) => {
  return (
    <Touchable
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={tabBarAccessibilityLabel}
      testID={tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.button, buttonStyle]}
      activeOpacity={1}>
      {icon}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: rem(12),
  },
});
