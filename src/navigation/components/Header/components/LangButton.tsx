// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {DropdownIcon} from '@svg/DropdownIcon';
import {WorldIcon} from '@svg/WorldIcon';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font} from 'rn-units';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const LangButton = ({
  containerStyle,
  color = COLORS.white,
}: Props = {}) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HomeTab')}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.langText, {color}]}>EN</Text>
        <WorldIcon fill={color} style={styles.worldIcon} />
        <DropdownIcon fill={color} style={styles.dropdownIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    fontSize: font(13),
    fontFamily: FONTS.primary.bold,
  },
  worldIcon: {
    marginLeft: 4,
  },
  dropdownIcon: {
    marginLeft: 3,
  },
});
