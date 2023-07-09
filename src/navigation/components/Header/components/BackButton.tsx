// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {BackButtonIcon} from '@svg/BackButtonIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  label?: string;
  allowOnTab?: boolean;
};

export const BackButton = ({
  containerStyle,
  color = COLORS.black,
  label,
  allowOnTab = false,
}: Props = {}) => {
  const navigation = useNavigation();

  // navigation.canGoBack also takes in account tabs, but getState().routes contains only stack routes
  if (!allowOnTab && navigation.getState().routes.length === 1) {
    return null;
  }

  return (
    <Touchable
      onPress={navigation.goBack}
      hitSlop={buttonHitSlop}
      style={[styles.container, containerStyle]}>
      <BackButtonIcon color={color} width={rem(16)} height={rem(14)} />
      {label && <Text style={[styles.labelText, {color}]}>{label}</Text>}
    </Touchable>
  );
};

const buttonHitSlop = {top: 15, left: 0, bottom: 0, right: 15};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: rem(12),
    ...font(16, 20, 'regular'),
  },
});
