// SPDX-License-Identifier: BUSL-1.1

import {useNavigation} from '@react-navigation/native';
import {BackButtonArrow} from '@svg/BackButtonIcon';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const BackButton = ({containerStyle, color}: Props = {}) => {
  const navigation = useNavigation();

  // navigation.canGoBack also takes in account tabs, but getState().routes contains only stack routes
  if (navigation.getState().routes.length === 1) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={navigation.goBack} hitSlop={buttonHitSlop}>
        <BackButtonArrow fill={color} />
      </TouchableOpacity>
    </View>
  );
};

const buttonHitSlop = {top: 15, left: 15, bottom: 15, right: 15};
