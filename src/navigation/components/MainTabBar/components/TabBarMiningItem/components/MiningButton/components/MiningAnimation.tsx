// SPDX-License-Identifier: ice License 1.0

import {LottieView, LottieViewProps} from '@components/LottieView';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  source: LottieViewProps['source'];
};

export const MiningAnimation = ({source}: Props) => {
  return (
    <LottieView
      style={styles.animation}
      source={source}
      autoPlay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: rem(67),
    height: rem(67),
  },
});
