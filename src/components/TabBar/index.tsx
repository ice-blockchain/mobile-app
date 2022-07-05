// SPDX-License-Identifier: BUSL-1.1

import Text from '@components/Text';
import Touchable from '@components/Touchable';
import React from 'react';
import {FlexStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {font, isIOS, rem} from 'rn-units';

type Tab = {
  text: String;
  screen: String;
};

type TabBar = {
  active?: number;
  tabs: Array<Tab>;
  onPress?: (tab?: Tab, index?: number) => void;
  style?: StyleProp<ViewStyle | FlexStyle>;
  opacity?: number;
  lightBg?: string;
  lightInactiveColor?: string;
  prefix?: string;
  postfix?: string;
};

export default function TabBar({
  active = 0,
  tabs = [],
  style = null,
  onPress = () => false,
  opacity = 0.3,
}: // prefix = '',
// postfix = '',
TabBar): React.ReactElement {
  const background = {
    backgroundColor: 'white',
  };
  const inactiveText = {
    color: '#cd9da5',
  };
  const activeText = {
    color: '#383b5f',
  };
  // const inactiveTab = {
  //   backgroundColor: 'transparent',
  // };
  // const activeTab = {
  //   backgroundColor: '#666081',
  // };

  const renderTab = (tab: Tab, index: number) => {
    const isActive = active === index;
    // const {children, ...rest} = tab;
    return (
      <Touchable
        key={`tab_${index}`}
        onPress={() => onPress(tab, index)}
        // testID={testIDs.components.tab(index, prefix, postfix)}
        style={
          [
            // styles.tab,
            // isActive && styles.shadow,
            // isActive ? activeTab : inactiveTab,
          ]
        }>
        <Text
          // {...rest}
          style={[styles.text, isActive ? activeText : inactiveText]}
        />
        {/* {children} */}
      </Touchable>
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.background, background, {opacity}]} />
      {tabs.map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: rem(5),
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  tab: {
    flex: 1,
    borderRadius: rem(5),
    margin: rem(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: rem(5),
    height: rem(40),
  },
  text: {
    fontSize: font(16),
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: isIOS ? 0 : 3,
  },
  shadow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
});
