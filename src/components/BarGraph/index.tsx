// SPDX-License-Identifier: ice License 1.0

import {StatsType} from '@components/BarGraph/components/BarLabel';
import {HorizontalBar} from '@components/BarGraph/components/HorizontalBar';
import {BarGraphData} from '@components/BarGraph/types';
import {useScreenTransitionEnd} from '@navigation/hooks/useScreenTransitionEnd';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {SharedValue, useSharedValue, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  type: StatsType;
  data: BarGraphData[];
};

export const Y_AXIS_WIDTH = rem(36);
const X_AXIS_HEIGHT = rem(20);
export const ROW_HEIGHT = rem(28);
const NUMBER_OF_STEPS_X = 10;
const LINE_HEIGHT = 12;

export const getBarGraphHeight = (numberOfRows: number) => {
  return X_AXIS_HEIGHT + numberOfRows * ROW_HEIGHT;
};

export function getValueData(data: BarGraphData[]) {
  const maxValue = data.length ? Math.max(...data.map(({value}) => value)) : 0;
  const stepValue = Math.ceil(maxValue / NUMBER_OF_STEPS_X);
  const numberOfSteps = Math.ceil(Math.min(maxValue, NUMBER_OF_STEPS_X));
  const lastXValue = stepValue * numberOfSteps;

  return {stepValue, lastXValue, numberOfSteps};
}

type BarFooterProps = {
  barWidth: number;
  stepValue: number;
  numberOfSteps: number;
};
export const BarFooter = memo(
  ({barWidth, stepValue, numberOfSteps}: BarFooterProps) => {
    return (
      <View style={[styles.xAxis, {width: barWidth}]}>
        {Array(numberOfSteps + 1)
          .fill(null)
          .map((_, i) => (
            <Text key={i} style={styles.xAxisText}>
              {formatNumber(stepValue * i, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                notation: 'compact',
              })}
            </Text>
          ))}
      </View>
    );
  },
);

type BarItemProps = {
  item: BarGraphData;
  maxWidth: number;
  maxValue: number;
  sharedValue: SharedValue<number>;
  doAnimate: boolean;
  type: StatsType;
};

export const BarItem = memo(
  ({
    item: {label, value},
    maxWidth,
    sharedValue,
    maxValue,
    doAnimate,
    type,
  }: BarItemProps) => {
    return (
      <View style={styles.row} key={`${label}${value}`}>
        <Text style={styles.yAxisText}>{label}</Text>
        <HorizontalBar
          maxValue={maxValue}
          maxWidth={maxWidth}
          value={value}
          sharedValue={sharedValue}
          doAnimate={doAnimate}
          type={type}
        />
      </View>
    );
  },
);

export const BarGraph = memo(({data, type}: Props) => {
  const {stepValue, lastXValue, numberOfSteps} = useMemo(
    () => getValueData(data),
    [data],
  );

  const {transitionEnd} = useScreenTransitionEnd();
  const [width, setWidth] = useState(0);
  const barWidth = width - Y_AXIS_WIDTH;
  const sharedValue = useSharedValue(-1);
  const lastElement = data[data.length - 1];

  useEffect(() => {
    if (width && transitionEnd && lastElement?.value != null && data.length) {
      sharedValue.value = -1;
      sharedValue.value = withTiming(0, {duration: 300});
    }
  }, [transitionEnd, width, lastElement?.value, data.length, sharedValue]);

  if (data.length === 0) {
    return null;
  }

  return (
    <View
      onLayout={({nativeEvent}: LayoutChangeEvent) => {
        setWidth(nativeEvent.layout.width);
      }}>
      {data.map(item => (
        <BarItem
          key={`${item.label}${item.value}`}
          item={item}
          maxWidth={barWidth}
          maxValue={lastXValue}
          sharedValue={sharedValue}
          doAnimate={true}
          type={type}
        />
      ))}
      <BarFooter
        barWidth={barWidth}
        stepValue={stepValue}
        numberOfSteps={numberOfSteps}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
  },
  yAxisText: {
    width: Y_AXIS_WIDTH,
    ...font(10, 12, 'medium', 'periwinkleGray'),
  },
  xAxis: {
    height: X_AXIS_HEIGHT,
    marginLeft: Y_AXIS_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  xAxisText: {
    ...font(10, LINE_HEIGHT, 'medium', 'periwinkleGray'),
  },
});
