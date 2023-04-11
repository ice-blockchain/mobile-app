// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
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
