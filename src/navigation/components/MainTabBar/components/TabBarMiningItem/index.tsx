// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningButton} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton';
import {useMiningButtonWalkthrough} from '@navigation/components/MainTabBar/components/TabBarMiningItem/hooks/useMiningButtonWalkthrough';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  const {onElementLayout, elementRef} = useMiningButtonWalkthrough();
  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      <View ref={elementRef} onLayout={onElementLayout} style={styles.button}>
        <MiningButton />
      </View>
    </ImageBackground>
  );
};

export const TAB_BAR_MINING_ITEM_TOP_OFFSET = rem(42);
export const TAB_BAR_MINING_BUTTON_SIZE = rem(100);

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: -TAB_BAR_MINING_ITEM_TOP_OFFSET,
    height: TAB_BAR_MINING_BUTTON_SIZE,
    width: TAB_BAR_MINING_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
