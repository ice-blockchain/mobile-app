// SPDX-License-Identifier: ice License 1.0

import {Segment} from '@components/SegmentedControl/components/Segment';
import {SegmentIndicator} from '@components/SegmentedControl/components/SegmentIndicator';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {FlexStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEGMENTED_CONTROL_HEIGHT = rem(55);
export const SEGMENTED_CONTROL_HORIZONTAL_OFFSET = rem(8);

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
          indicator: {
            width: `${segmentWidthPerc}%`,
          },
        }),
      [segmentWidthPerc],
    );

    const animatedStyles = useAnimatedStyle(() => ({
      left: `${translateX.value}%`,
    }));

    return (
      <View style={[styles.container, commonStyles.shadow, style]}>
        <View style={styles.body}>
          <SegmentIndicator style={[dynamicStyles.indicator, animatedStyles]} />
          {segments.map((segment, index) => {
            const active = activeIndex === index;
            return (
              <Segment
                key={segment.key}
                style={styles.segment}
                active={active}
                segment={segment}
                onPress={() => onSegmentPress(index)}
              />
            );
          })}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    paddingHorizontal: SEGMENTED_CONTROL_HORIZONTAL_OFFSET,
    minHeight: SEGMENTED_CONTROL_HEIGHT,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  segment: {
    flex: 1,
  },
});
