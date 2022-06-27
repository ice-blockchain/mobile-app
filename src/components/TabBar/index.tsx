// SPDX-License-Identifier: BUSL-1.1

import Text from '@components/Text';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {useState} from 'react';
import {
  Animated,
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {font, isIOS, screenWidth, wait} from 'rn-units';

const TAB_BAR_WIDTH = screenWidth - 48;
const DEFAULT_TAB_MARGIN = 9;
const TAB_BAR_HEIGHT = 55;
const ANIMATION_DELAY = 500;

export type Tab = {
  text: String;
  screen: String;
};

type TabBar = {
  tabs: Array<Tab>;
  onPress?: (tab?: Tab, index?: number) => void;
  style?: StyleProp<ViewStyle | FlexStyle>;
  lightBg?: string;
  lightInactiveColor?: string;
};

export function TabBar({
  tabs = [],
  style = null,
  onPress = () => false,
}: TabBar): React.ReactElement {
  const [translateValue] = useState(new Animated.Value(0));
  const [activeIndex, setActiveIndex] = useState(0);

  const background = {
    backgroundColor: 'white',
  };
  const inactiveText = {
    color: COLORS.darkBlue,
  };
  const activeText = {
    color: COLORS.white,
  };

  const indicatorStyle = {
    width: TAB_BAR_WIDTH / tabs.length,
    height: TAB_BAR_HEIGHT - DEFAULT_TAB_MARGIN * 2,
  };

  const combinedIndicatorSubStyle = [
    indicatorStyle,
    styles.indicatorSubContainer,
  ];

  const tabSelected = async (index: number) => {
    Animated.spring(translateValue, {
      toValue: index * (TAB_BAR_WIDTH / tabs.length),
      velocity: 10,
      useNativeDriver: true,
    }).start();
    wait(ANIMATION_DELAY);
    setActiveIndex(index);
  };

  const renderTab = (tab: Tab, index: number) => {
    const isActive = activeIndex === index;
    const {text} = tab;
    return (
      <Touchable
        key={`tab_${index}`}
        onPress={() => {
          tabSelected(index);
          onPress(tab, index);
        }}
        delay={ANIMATION_DELAY}
        style={styles.tab}>
        <Text
          text={`${text}`}
          style={[styles.text, isActive ? activeText : inactiveText]}
        />
      </Touchable>
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.background, background]} />
      <View style={styles.indicatorContainer}>
        <Animated.View
          style={[
            combinedIndicatorSubStyle,
            {transform: [{translateX: translateValue}]},
          ]}>
          <View style={styles.indicator} />
        </Animated.View>
      </View>
      {tabs.map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    width: TAB_BAR_WIDTH,
    height: TAB_BAR_HEIGHT,
    backgroundColor: COLORS.white,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 1,
    alignSelf: 'center',
    marginTop: 24,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
  },
  indicatorSubContainer: {
    marginTop: DEFAULT_TAB_MARGIN,
  },
  indicator: {
    backgroundColor: COLORS.darkBlue,
    flex: 1,
    marginHorizontal: DEFAULT_TAB_MARGIN,
    borderRadius: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
  },
  text: {
    fontSize: font(16),
    marginTop: isIOS ? 0 : 3,
    fontFamily: FONTS.primary.bold,
  },
});
