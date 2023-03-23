// SPDX-License-Identifier: ice License 1.0

import {MiningTooltip} from '@navigation/components/MainTabBar/components/MiningTooltip';
import {MiningButton} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {rem} from 'rn-units';

export const useStackingModal = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const lottieWrapperRef = useRef<View>(null);

  const showStackingModal = useCallback(() => {
    navigation.navigate('Tooltip', {
      position: 'above',
      targetRef: lottieWrapperRef,
      descriptionOffset: rem(40),
      targetCircleSize: rem(92),
      TargetComponent: MiningButton,
      DescriptionComponent: MiningTooltip,
    });
  }, [navigation]);

  return {lottieWrapperRef, showStackingModal};
};
