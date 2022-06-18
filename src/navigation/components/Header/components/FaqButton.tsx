// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {FaqIcon} from '@svg/FaqIcon';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const FaqButton = ({
  containerStyle,
  color = COLORS.darkBlue,
}: Props = {}) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeTab')}
        hitSlop={buttonHitSlop}>
        <FaqIcon fill={color} />
      </TouchableOpacity>
    </View>
  );
};

const buttonHitSlop = {top: 4, left: 4, bottom: 4, right: 4};
