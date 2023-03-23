// SPDX-License-Identifier: ice License 1.0

import {Images} from '@images';
import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {MiningButton} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const TabBarMiningItem = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={Images.tabbar.miningBackground}>
      <View style={styles.button}>
        <MiningButton />
      </View>
    </ImageBackground>
  );
};

export const TAB_BAR_MINING_ITEM_TOP_OFFSET = rem(42);

const styles = StyleSheet.create({
  container: {
    height: MAIN_TAB_BAR_HEIGHT,
    width: rem(112),
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    top: -TAB_BAR_MINING_ITEM_TOP_OFFSET,
    height: rem(100),
    width: rem(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
