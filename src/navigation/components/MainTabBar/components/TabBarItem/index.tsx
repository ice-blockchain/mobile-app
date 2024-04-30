// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {TabBarIcon} from '@navigation/components/MainTabBar/components/TabBarItem/components/TabBarIcon';
import {useTabBarWalkthrough} from '@navigation/components/MainTabBar/hooks/useTabBarWalkthrough';
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
  name: string;
} & BottomTabBarProps;

export const TabBarItem = ({
  state,
  descriptors,
  navigation,
  index,
  buttonStyle,
  name,
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
      navigation.navigate({name: route.name, params: undefined, merge: true});
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const {onElementLayout, elementRef} = useTabBarWalkthrough({
    tabName: name,
    onPress,
    onLongPress,
    icon: options.tabBarIcon
      ? options.tabBarIcon({focused: true, color: COLORS.white, size: 20})
      : null,
  });

  return (
    <View style={styles.container} ref={elementRef} onLayout={onElementLayout}>
      <ImageBackground
        style={styles.container}
        source={Images.tabbar.itemBackground}>
        <View style={styles.body}>
          <TabBarIcon
            icon={<View style={options.tabBarIconStyle}>{icon}</View>}
            tabBarTestID={options.tabBarTestID}
            tabBarAccessibilityLabel={options.tabBarAccessibilityLabel}
            onLongPress={onLongPress}
            onPress={onPress}
            isFocused={isFocused}
            buttonStyle={buttonStyle}
          />
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
});
