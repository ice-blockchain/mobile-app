// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
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
        hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <FaqIcon fill={color} />
      </TouchableOpacity>
    </View>
  );
};
