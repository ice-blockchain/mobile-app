// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QRCodeIcon} from '@svg/QRCodeIcon';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const QRCodeShareButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  return (
    <View style={containerStyle}>
      <Touchable
        onPress={() => navigation.navigate('QRCodeShare')}
        hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <QRCodeIcon color={color} />
      </Touchable>
    </View>
  );
};
