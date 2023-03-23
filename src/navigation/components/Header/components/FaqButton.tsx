// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {FaqIcon} from '@svg/FaqIcon';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const FaqButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props = {}) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  return (
    <View style={containerStyle}>
      <Touchable
        onPress={() => navigation.navigate('HomeTab')}
        hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <FaqIcon fill={color} />
      </Touchable>
    </View>
  );
};
