// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {rem} from 'rn-units';

export const ContextualMenu = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const {
    params: {coords, buttons, onClose},
  } = useRoute<RouteProp<MainStackParamList, 'ContextualMenu'>>();

  const closeMenu = () => {
    navigation.goBack();
    onClose?.();
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        <View style={[styles.menu, commonStyles.shadow, coords]}>
          {buttons.map(button => (
            <Touchable
              key={button.label}
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                setTimeout(button.onPress, 100);
              }}>
              {button.icon && (
                <View style={styles.menuItemIcon}>{button.icon}</View>
              )}
              <Text style={styles.menuItemText}>{button.label}</Text>
            </Touchable>
          ))}
          <RoundedTriangle
            fill={COLORS.white}
            width={rem(24)}
            height={rem(24)}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    backgroundColor: COLORS.white,
    paddingVertical: rem(10),
    borderRadius: rem(20),
    position: 'absolute',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: rem(8),
    paddingHorizontal: rem(20),
  },
  menuItemIcon: {
    width: rem(24),
    height: rem(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    marginLeft: rem(12),
    ...font(17, null, 'semibold', 'downriver'),
  },
  arrow: {
    position: 'absolute',
    right: rem(5),
    top: -rem(11),
  },
});
