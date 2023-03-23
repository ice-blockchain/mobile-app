// SPDX-License-Identifier: ice License 1.0

import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useTopOffsetStyle = ({extraOffset = rem(0)}: Params = {}) => {
  const {top: topInset} = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingTop: topInset + extraOffset},
      }),
    [extraOffset, topInset],
  );
};
