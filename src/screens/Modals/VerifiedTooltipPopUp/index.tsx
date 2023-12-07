// SPDX-License-Identifier: ice License 1.0

import {commonStyles, windowWidth} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  TOOLTIP_HEIGHT,
  TOOLTIP_WIDTH,
  VerifiedTooltip,
} from '@screens/HomeFlow/Home/components/Header/components/VerifiedTooltip';
import {isRTL} from '@translations/i18n';
import {useCallback, useMemo} from 'react';
import React, {View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

export const VerifiedTooltipPopUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();

  const {
    params: {hostViewParams, correctiveOffset = 2},
  } = useRoute<RouteProp<MainStackParamList, 'VerifiedTooltipPopUp'>>();

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const containerStyle = useMemo(() => {
    const rtlX =
      windowWidth -
      hostViewParams.x -
      TOOLTIP_WIDTH / 2 -
      hostViewParams.width / 2 +
      correctiveOffset;
    const ltrX =
      hostViewParams.x -
      TOOLTIP_WIDTH / 2 +
      hostViewParams.width / 2 +
      correctiveOffset;

    return {
      top: hostViewParams.y + TOOLTIP_HEIGHT + 4,
      left: isRTL ? rtlX : ltrX,
    };
  }, [
    hostViewParams.width,
    hostViewParams.y,
    hostViewParams.x,
    correctiveOffset,
  ]);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(onClose)();
  });

  const pan = Gesture.Pan()
    .minPointers(1)
    .minDistance(0)
    .averageTouches(true)
    .onStart(() => {
      runOnJS(onClose)();
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(tap, pan)}>
      <View style={commonStyles.flexOne}>
        <VerifiedTooltip style={containerStyle} />
      </View>
    </GestureDetector>
  );
};
