// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicatorTheme} from '@components/ActivityIndicator';
import {RefreshIceIcon} from '@components/RefreshControl';
import {hapticFeedback} from '@utils/device';
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatListProps,
  Platform,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  AnimateProps,
  cancelAnimation,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
    AnimateProps<ScrollViewProps | FlatListProps<unknown>>
  >;
  theme?: ActivityIndicatorTheme;
  onScrollTranslateY?: Animated.SharedValue<number>;
}

/**
 * Space for activity indicator while refreshing
 */
const REFRESH_THRESHOLD = rem(50);

/**
 * On Android scrollable view will be scrolled a little bit even pan gesture becomes active
 */
const CONTENT_SCROLLED_THRESHOLD = Platform.select({
  android: 10,
  default: 0,
});

export const PullToRefreshContainer = ({
  style,
  theme,
  refreshing,
  onRefresh: onRefreshProps,
  children,
  onScrollTranslateY,
}: Props) => {
  const [isRefreshScrolled, setRefreshScrolled] = useState(false);

  const [isContentScrolled, setContentScrolled] = useState(false);

  const translateYPanGesture = useSharedValue(0);

  const translateYScrollable = useSharedValue(0);

  const panEnabled = !refreshing && !isContentScrolled;

  const scrollEnabled = refreshing || !isRefreshScrolled;

  const scrollHandler = useAnimatedScrollHandler(({contentOffset: {y}}) => {
    translateYScrollable.value = y;

    if (onScrollTranslateY) {
      onScrollTranslateY.value = y;
    }
  });

  const onRefresh = useCallback(() => {
    hapticFeedback();

    onRefreshProps();
  }, [onRefreshProps]);

  const runStaticPositionAnimation = useCallback(() => {
    cancelAnimation(translateYPanGesture);

    translateYPanGesture.value = withTiming(
      refreshing && !isContentScrolled ? -REFRESH_THRESHOLD : 0,
      {
        duration: 400,
      },
    );
  }, [isContentScrolled, refreshing, translateYPanGesture]);

  const gesture = useMemo(() => {
    const panGesture = Gesture.Pan()
      .onUpdate(({translationY}) => {
        translateYPanGesture.value = interpolate(
          translationY,
          [0, REFRESH_THRESHOLD],
          [0, -REFRESH_THRESHOLD],
          {
            extrapolateLeft: Extrapolate.CLAMP,
          },
        );
      })
      .onEnd(() => {
        runOnJS(runStaticPositionAnimation)();
      })
      .enabled(panEnabled);

    const nativeGesture = Gesture.Native();

    if (isContentScrolled && Platform.OS === 'ios') {
      return nativeGesture;
    }

    return Gesture.Simultaneous(
      panGesture,
      Gesture.Native().enabled(scrollEnabled),
    );
  }, [
    isContentScrolled,
    panEnabled,
    runStaticPositionAnimation,
    scrollEnabled,
    translateYPanGesture,
  ]);

  useEffect(runStaticPositionAnimation, [runStaticPositionAnimation]);

  useAnimatedReaction(
    () => translateYPanGesture.value * -1 > REFRESH_THRESHOLD * 1.5,
    (isPassedRefreshPoint, previous) => {
      if (isPassedRefreshPoint !== previous && isPassedRefreshPoint) {
        runOnJS(onRefresh)();
      }
    },
    [onRefresh],
  );

  useAnimatedReaction(
    () => translateYScrollable.value > CONTENT_SCROLLED_THRESHOLD,
    (result, previous) => {
      if (result !== previous) {
        runOnJS(setContentScrolled)(result);
      }
    },
  );

  useAnimatedReaction(
    () => translateYPanGesture.value !== 0,
    (result, previous) => {
      if (result !== previous) {
        runOnJS(setRefreshScrolled)(result);
      }
    },
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
  });

  const childrenScrollable = useMemo(
    () =>
      cloneElement(children, {
        style: containerAnimatedStyle,
        scrollEventThrottle: 16,
        onScroll: scrollHandler,
        bounces: false,
        alwaysBounceVertical: false,
        scrollEnabled,
      }),
    [children, containerAnimatedStyle, scrollEnabled, scrollHandler],
  );

  return (
    <View style={style}>
      <RefreshIceIcon
        refreshing={refreshing}
        translateY={translateYPanGesture}
        theme={theme}
      />

      <GestureDetector gesture={gesture}>{childrenScrollable}</GestureDetector>
    </View>
  );
};
