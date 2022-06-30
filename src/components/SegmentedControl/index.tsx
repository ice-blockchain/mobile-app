// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {font} from 'rn-units';

const DEFAULT_MARGIN = 8;
const CONTROL_HEIGHT = 55;

type Segment = {
  text?: string;
  renderText?: (active: boolean) => ReactNode;
  key: string;
};

export type SegmentedControlMethods = {
  changeSegment: (index: number) => void;
};

export type SegmentedControlProps = {
  segments: Segment[] | ReadonlyArray<Segment>;
  onChange?: (index: number) => void;
  initialIndex?: number;
  style?: StyleProp<ViewStyle | FlexStyle>;
};

export const SegmentedControl = forwardRef<
  SegmentedControlMethods,
  SegmentedControlProps
>(
  (
    {
      segments = [],
      initialIndex = 0,
      style,
      onChange = () => {},
    }: SegmentedControlProps,
    forwardedRef: Ref<SegmentedControlMethods>,
  ) => {
    const segmentWidthPerc = 100 / segments.length;
    const translateX = useSharedValue(segmentWidthPerc * initialIndex);
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const changeSegment = (index: number) => {
      setActiveIndex(index);
      translateX.value = withSpring(segmentWidthPerc * index, {
        velocity: 10,
        damping: 30,
        stiffness: 500,
      });
    };

    useImperativeHandle(forwardedRef, () => ({changeSegment}));

    const onSegmentPress = (index: number) => {
      if (index !== activeIndex) {
        changeSegment(index);

        /**
         * Postpone onChange to give time for React to update segment styles
         * according to the new activeIndex -> usually triggering onChange leads to a huge
         * VDOM changes that lead to temp blocking JS thread and hence UI glitches.
         */
        setTimeout(() => {
          onChange(index);
        });
      }
    };

    const dynamicStyles = useMemo(
      () =>
        StyleSheet.create({
          // eslint-disable-next-line react-native/no-unused-styles
          indicator: {
            width: `${segmentWidthPerc}%`,
          },
        }),
      [segmentWidthPerc],
    );

    const animatedStyles = useAnimatedStyle(() => ({
      left: `${translateX.value}%`,
    }));

    const renderSegment = (segment: Segment, index: number) => {
      const active = activeIndex === index;
      return (
        <TouchableOpacity
          key={segment.key}
          onPress={() => {
            onSegmentPress(index);
          }}
          style={styles.segment}>
          {typeof segment.renderText === 'function' ? (
            segment.renderText(active)
          ) : (
            <Text
              style={[
                styles.text,
                active ? styles.activeText : styles.inactiveText,
              ]}>
              {segment.text ?? ''}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={[styles.container, commonStyles.shadow, style]}>
        <View style={styles.body}>
          <Animated.View
            style={[styles.indicator, dynamicStyles.indicator, animatedStyles]}
          />
          {segments.map(renderSegment)}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    paddingHorizontal: DEFAULT_MARGIN,
    height: CONTROL_HEIGHT,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  indicator: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginVertical: DEFAULT_MARGIN,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: font(16),
    fontFamily: FONTS.primary.bold,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.darkBlue,
  },
});
