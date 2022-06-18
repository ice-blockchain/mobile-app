// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {SettingsIcon} from '@svg/SettingsIcons';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const SettingsButton = ({
  containerStyle,
  color = COLORS.darkBlue,
}: Props = {}) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsTab')}
        hitSlop={buttonHitSlop}>
        <SettingsIcon fill={color} />
      </TouchableOpacity>
    </View>
  );
};

const buttonHitSlop = {top: 4, left: 4, bottom: 4, right: 4};
