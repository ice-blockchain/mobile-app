// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import React, {ReactNode, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlexStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font} from 'rn-units';

const DEFAULT_MARGIN = 8;
const CONTROL_HEIGHT = 55;

type Segment = {text: string | ReactNode; key: string};

export type SegmentedControlProps = {
  segments: Segment[] | ReadonlyArray<Segment>;
  onChange?: (index: number) => void;
  style?: StyleProp<ViewStyle | FlexStyle>;
};

export const SegmentedControl = ({
  segments = [],
  style,
  onChange = () => {},
}: SegmentedControlProps) => {
  const controlWidth = useRef(0);
  const [translateValue] = useState(new Animated.Value(0));
  const [activeIndex, setActiveIndex] = useState(0);

  const dynamicStyle = useMemo(
    () =>
      StyleSheet.create({
        indicator: {
          width: 100 / segments.length + '%',
        },
      }),
    [segments.length],
  );

  const onSegmentSelect = async (index: number) => {
    Animated.spring(translateValue, {
      toValue: index * (controlWidth.current / segments.length),
      velocity: 10,
      useNativeDriver: true,
    }).start();
    setActiveIndex(index);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    controlWidth.current = width;
  };

  const renderSegment = (segment: Segment, index: number) => {
    const isActive = activeIndex === index;
    return (
      <TouchableOpacity
        key={segment.key}
        onPress={() => {
          if (!isActive) {
            onSegmentSelect(index);
            onChange(index);
          }
        }}
        style={styles.segment}>
        <Text
          style={[
            styles.text,
            isActive ? styles.activeText : styles.inactiveText,
          ]}>
          {segment.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, commonStyles.shadow, style]}>
      <View style={styles.body} onLayout={onLayout}>
        <Animated.View
          style={[
            dynamicStyle.indicator,
            styles.indicator,
            StyleSheet.absoluteFill,
            {transform: [{translateX: translateValue}]},
          ]}
        />
        {segments.map(renderSegment)}
      </View>
    </View>
  );
};

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
