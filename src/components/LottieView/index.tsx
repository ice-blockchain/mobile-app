// SPDX-License-Identifier: ice License 1.0

/* eslint-disable no-restricted-imports */
import {useHandleLottieBackground} from '@components/LottieView/hooks/useHandleLottieBackground';
import AnimatedLottieView, {
  LottieViewProps as ImportedLottieViewProps,
} from 'lottie-react-native';
import React, {useRef} from 'react';

export type LottieViewProps = ImportedLottieViewProps;

export type LottieViewMethods = AnimatedLottieView;

export const LottieView = (props: LottieViewProps) => {
  const ref = useRef(null);

  useHandleLottieBackground(ref);

  return <AnimatedLottieView {...props} ref={ref} />;
};
