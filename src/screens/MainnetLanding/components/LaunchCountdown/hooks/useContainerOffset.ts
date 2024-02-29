// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

const verticalOffset = rem(10);

export const useContainerOffset = () => {
  const {bottom: bottomInset} = useSafeAreaInsets();

  return useMemo(
    () =>
      StyleSheet.create({
        current: {
          paddingTop: verticalOffset,
          paddingBottom: Math.max(bottomInset, verticalOffset),
        },
      }),
    [bottomInset],
  );
};
