// SPDX-License-Identifier: BUSL-1.1

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = ({
  extraOffset = rem(64),
}: Params = {}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingBottom: tabBarHeight + extraOffset},
      }),
    [tabBarHeight, extraOffset],
  );
};
