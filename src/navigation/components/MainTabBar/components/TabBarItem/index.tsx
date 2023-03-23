// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {Images} from '@images';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

const SHADOW_HEIGHT = rem(7);

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
      <ImageBackground
        style={styles.container}
        source={Images.tabbar.itemBackground}>
        <View style={styles.body}>
          <Touchable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.button, buttonStyle]}
            activeOpacity={1}>
            {icon}
          </Touchable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    marginTop: SHADOW_HEIGHT,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: rem(12),
  },
});
