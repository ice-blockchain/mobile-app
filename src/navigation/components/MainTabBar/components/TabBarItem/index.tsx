// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const SHADOW_HEIGHT = 7;

type Props = {
  index: number;
  buttonStyle?: StyleProp<ViewStyle>;
} & BottomTabBarProps;

export const TabBarItem = ({
  state,
  descriptors,
  navigation,
  index,
  buttonStyle,
}: Props) => {
  const route = state.routes[index];
  const isFocused = state.index === index;
  const {options} = descriptors[route.key];
  const icon = options.tabBarIcon
    ? options.tabBarIcon({focused: isFocused, color: '', size: 20})
    : null;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      // @ts-ignore that is basically taken from the sources
      navigation.navigate({name: route.name, merge: true});
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.shadow} source={Images.tabbar.shadow} />
      <View style={styles.body}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={[styles.button, buttonStyle]}>
          {icon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    height: SHADOW_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  body: {
    marginTop: SHADOW_HEIGHT,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
});
