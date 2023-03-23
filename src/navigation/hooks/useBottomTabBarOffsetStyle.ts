// SPDX-License-Identifier: ice License 1.0

import {MAIN_TAB_BAR_HEIGHT} from '@navigation/components/MainTabBar';
import {TAB_BAR_MINING_ITEM_TOP_OFFSET} from '@navigation/components/MainTabBar/components/TabBarMiningItem';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = ({extraOffset}: Params = {}) => {
  const extraPadding = extraOffset ?? TAB_BAR_MINING_ITEM_TOP_OFFSET + rem(16);

  return useMemo(
    () =>
      StyleSheet.create({
        current: {
          paddingBottom: MAIN_TAB_BAR_HEIGHT + extraPadding,
        },
      }),
    [extraPadding],
  );
};
