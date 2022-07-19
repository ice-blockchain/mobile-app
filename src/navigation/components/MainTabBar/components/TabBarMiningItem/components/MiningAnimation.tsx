// SPDX-License-Identifier: BUSL-1.1

import {LottieAnimations} from '@lottie';
import LottieView from 'lottie-react-native';
import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const MiningAnimation = forwardRef<LottieView>((_, reforwardedRef) => (
  <LottieView
    style={styles.animation}
    source={LottieAnimations.minings}
    autoPlay={true}
    loop={true}
    ref={reforwardedRef}
  />
));

const styles = StyleSheet.create({
  animation: {
    width: rem(67),
    height: rem(67),
  },
});
