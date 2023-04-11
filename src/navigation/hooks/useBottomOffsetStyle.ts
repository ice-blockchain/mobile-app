// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Params = {
  extraOffset?: number;
};

export const useBottomOffsetStyle = ({extraOffset = rem(0)}: Params = {}) => {
  const {bottom: bottomInset} = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        current: {paddingBottom: bottomInset + extraOffset},
      }),
    [extraOffset, bottomInset],
  );
};
