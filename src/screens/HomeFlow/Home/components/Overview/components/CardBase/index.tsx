// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React, {forwardRef, ReactNode, Ref, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextProps,
  View,
} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

type Props = {
  backgroundImageSource: ImageSourcePropType;
  headerTitle?: string;
  headerTitleIcon?: ReactNode;
  HeaderValue?: string | React.FC<TextProps>;
  headerValueIcon?: ReactNode;
  sharedIsCollapsed: Animated.SharedValue<number>;
  children: ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const HEADER_MARGIN_TOP = rem(12);
export const CARDS_TOTAL_HEIGHT = rem(140);
export const CARDS_COLLAPSED_HEIGHT = rem(48);
export const CARD_WIDTH = rem(274);
export const CARD_MARGIN_RIGHT_WIDTH = rem(16);
export const CARD_BORDER_RADIUS = rem(20);

export const CardBase = forwardRef(
  (
    {
      onLayout,
      backgroundImageSource,
      headerTitle,
      headerTitleIcon,
      HeaderValue,
      headerValueIcon,
      sharedIsCollapsed,
      children,
    }: Props,
    forwardedRef: Ref<View>,
  ) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const animatedHeaderStyle = useAnimatedStyle(
      () => ({
        transform: [
          {
            translateY: interpolate(
              sharedIsCollapsed.value,
              [0, 1],
              [
                0,
                (CARDS_COLLAPSED_HEIGHT - headerHeight) / 2 - HEADER_MARGIN_TOP,
              ],
              'clamp',
            ),
          },
        ],
      }),
      [headerHeight],
    );
    const animatedChildrenContainerStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(sharedIsCollapsed.value, [0, 0.7], [1, 0]),
      };
    }, []);

    return (
      <View ref={forwardedRef} style={styles.container} onLayout={onLayout}>
        <Image
          source={backgroundImageSource}
          resizeMode={'cover'}
          style={styles.backgroundImage}
        />
        <Animated.View
          style={[styles.header, headerHeight ? animatedHeaderStyle : null]}
          onLayout={({nativeEvent}) => {
            setHeaderHeight(nativeEvent.layout.height);
          }}>
          <View style={styles.title}>
            {headerTitleIcon}
            <Text style={styles.titleText}>{headerTitle}</Text>
          </View>
          {headerValueIcon}
          {!HeaderValue || typeof HeaderValue === 'string' ? (
            <Text style={styles.valueText}>{HeaderValue}</Text>
          ) : (
            <HeaderValue style={styles.valueText} />
          )}
        </Animated.View>
        <Animated.View style={[styles.body, animatedChildrenContainerStyle]}>
          {children}
        </Animated.View>
      </View>
    );
  },
);

export const CardBaseSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={CARD_BORDER_RADIUS}>
      <View style={styles.skeleton} />
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN_RIGHT_WIDTH,
    borderRadius: rem(20),
    paddingHorizontal: rem(15),
    overflow: 'hidden',
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HEADER_MARGIN_TOP,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 16, 'black'),
  },
  valueText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 16, 'black'),
  },
  body: {
    flexGrow: 1,
    flexShrink: 0,
  },
  skeleton: {
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
    marginRight: CARD_MARGIN_RIGHT_WIDTH,
  },
});
