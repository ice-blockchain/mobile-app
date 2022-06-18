// SPDX-License-Identifier: BUSL-1.1

import {Badge} from '@components/Badge';
import {COLORS} from '@constants/colors';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NotificationsIcon} from '@svg/NotificationsIcon';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const NotificationsButton = ({
  containerStyle,
  color = COLORS.darkBlue,
}: Props = {}) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TeamTab')}
        hitSlop={buttonHitSlop}>
        <NotificationsIcon fill={color} />
      </TouchableOpacity>
      <Badge value={'9+'} style={styles.badge} />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

const buttonHitSlop = {top: 4, left: 4, bottom: 4, right: 4};
