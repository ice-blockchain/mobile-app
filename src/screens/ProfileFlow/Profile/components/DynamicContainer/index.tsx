// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {STATIC_CONTENT_TOP_OFFSET} from '@screens/ProfileFlow/Profile/components/StaticContainer';
import {USER_INFO_HEIGHT} from '@screens/ProfileFlow/Profile/components/UserInfo';
import React, {ReactNode, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  animatedIndex: SharedValue<number>;
};

export const DynamicContainer = ({children, animatedIndex}: Props) => {
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const {top: topInset} = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const snapPoints = useMemo(() => {
    const collapsed = frame.height - HEADER_HEIGHT - topInset;

    const expanded =
      frame.height -
      USER_INFO_HEIGHT -
      HEADER_HEIGHT -
      STATIC_CONTENT_TOP_OFFSET -
      topInset;

    return [expanded, collapsed];
  }, [frame.height, topInset]);

  const animatedBorderRadius = useAnimatedStyle(() => {
    /**
     * withTiming is required here to make border radius
     * animation more smooth
     * Without it after animation completed - animated corner is blinking
     */
    const borderRadius = withTiming(
      interpolate(
        animatedIndex.value,
        [0, 1],
        [commonStyles.baseSubScreen.borderTopLeftRadius, 0],
      ),
      {duration: 100},
    );
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag
      overDragResistanceFactor={10}
      backgroundStyle={commonStyles.baseSubScreen}
      activeOffsetY={[-5, 5]}
      animatedIndex={animatedIndex}>
      <BottomSheetScrollView
        style={commonStyles.flexOne}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabBarOffset.current}>
        <Animated.View
          style={[
            commonStyles.flexOne,
            animatedBorderRadius,
            styles.container,
          ]}>
          {children}
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
});
