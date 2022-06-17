// SPDX-License-Identifier: BUSL-1.1

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomTabBarOffsetStyle = (params?: Params) => {
  const tabBarHeight = useBottomTabBarHeight();
  const extraOffset = params?.extraOffset ?? rem(46);
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingBottom: tabBarHeight + extraOffset},
      }),
    [tabBarHeight, extraOffset],
  );
};
