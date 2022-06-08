// SPDX-License-Identifier: BUSL-1.1

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = (params?: Params) => {
  const tabBarHeight = useBottomTabBarHeight();
  const extraOffset = params?.extraOffset ?? 0;
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingBottom: tabBarHeight + extraOffset},
      }),
    [tabBarHeight, extraOffset],
  );
};
