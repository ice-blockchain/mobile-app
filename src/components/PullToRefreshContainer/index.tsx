// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicatorTheme} from '@components/ActivityIndicator';
import {RefreshIceIcon} from '@components/RefreshControl';
import {hapticFeedback} from '@utils/device';
import React, {cloneElement, useCallback, useMemo} from 'react';
import {
  FlatListProps,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  AnimatedProps,
  AnimatedRef,
  Extrapolate,
  interpolate,
  runOnJS,
  scrollTo,
  SharedValue,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

interface Props {
  style?: StyleProp<ViewStyle>;
  refreshing: boolean;
  onRefresh(): void;
  /**
   * Implemented for Animated.ScrollView and Animated.FlatList.
   * In theory can be used with any views
   */
  children: React.ReactElement<
    AnimatedProps<ScrollViewProps | FlatListProps<unknown>>
  >;
  theme?: ActivityIndicatorTheme;
  onScrollTranslateY?: SharedValue<number>;
  animatedScrollViewRef?: AnimatedRef<Animated.ScrollView>;
}

/**
 * Space for activity indicator while refreshing
 */
const REFRESH_THRESHOLD = rem(100);

export const PullToRefreshContainer = ({
  style,
  theme,
  refreshing,
  onRefresh: onRefreshProps,
  children,
  onScrollTranslateY,
  animatedScrollViewRef,
}: Props) => {
  const translateYPanGesture = useSharedValue(0);

  const sharedPanGestureStartY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    {
      onBeginDrag: event => {
        sharedPanGestureStartY.value = event.contentOffset.y;
      },
      onScroll: ({contentOffset: {y}}) => {
        if (y > 0 && translateYPanGesture.value < 0 && animatedScrollViewRef) {
          scrollTo(animatedScrollViewRef, 0, 0, true);
        }
        if (onScrollTranslateY) {
          onScrollTranslateY.value = y;
        }
      },
    },
    [],
  );

  const onRefresh = useCallback(() => {
    hapticFeedback();
    onRefreshProps();
  }, [onRefreshProps]);

  const gesture = useMemo(() => {
    const panGesture = Gesture.Pan()
      .activeOffsetY([-10, 10])
      .failOffsetX([-10, 10])
      .onUpdate(({translationY}) => {
        translateYPanGesture.value = interpolate(
          translationY - sharedPanGestureStartY.value,
          [0, REFRESH_THRESHOLD, REFRESH_THRESHOLD * 10],
          [0, -REFRESH_THRESHOLD, -REFRESH_THRESHOLD * 4],
          Extrapolate.CLAMP,
        );
      })
      .onEnd(() => {
        translateYPanGesture.value = withSpring(0, {
          damping: 50,
          mass: 1,
          stiffness: 200,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
        });
      });

    const nativeGesture = Gesture.Native();
    return Gesture.Simultaneous(panGesture, nativeGesture);
  }, [sharedPanGestureStartY.value, translateYPanGesture]);

  useAnimatedReaction(
    () => translateYPanGesture.value * -1 > REFRESH_THRESHOLD * 1.5,
    (isPassedRefreshPoint, previous) => {
      if (isPassedRefreshPoint !== previous && isPassedRefreshPoint) {
        runOnJS(onRefresh)();
      }
    },
    [onRefresh],
  );

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        {
          translateY: -translateYPanGesture.value,
        },
      ],
    };
  }, []);

  const childrenScrollable = useMemo(
    () =>
      cloneElement(children, {
        style: containerAnimatedStyle,
        scrollEventThrottle: 16,
        onScroll: scrollHandler,
        bounces: false,
        alwaysBounceVertical: false,
      }),
    [children, containerAnimatedStyle, scrollHandler],
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        -translateYPanGesture.value,
        [0, 24, REFRESH_THRESHOLD],
        [0, 1, 1],
      ),
      transform: [
        {
          translateY: interpolate(
            -translateYPanGesture.value,
            [0, REFRESH_THRESHOLD, REFRESH_THRESHOLD * 2],
            [-16, 10, 70],
          ),
        },
      ],
    };
  });

  return (
    <View style={style}>
      <RefreshIceIcon
        refreshing={refreshing}
        translateY={translateYPanGesture}
        theme={theme}
        animatedContainerStyle={animatedContainerStyle}
      />

      <GestureDetector gesture={gesture}>{childrenScrollable}</GestureDetector>
    </View>
  );
};
