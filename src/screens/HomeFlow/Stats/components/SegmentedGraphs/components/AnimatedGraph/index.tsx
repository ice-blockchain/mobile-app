// SPDX-License-Identifier: ice License 1.0

import {
  BarFooter,
  BarItem,
  getValueData,
  ROW_HEIGHT,
  Y_AXIS_WIDTH,
} from '@components/BarGraph';
import {BarGraphData} from '@components/BarGraph/types';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useScreenTransitionEnd} from '@navigation/hooks/useScreenTransitionEnd';
import React, {
  ComponentType,
  memo,
  ReactElement,
  useEffect,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {screenHeight} from 'rn-units';

type Props = {
  data: BarGraphData[];
  ListHeader?: ComponentType | ReactElement;
};

export const AnimatedGraph = memo(({data, ListHeader}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();
  const {transitionEnd} = useScreenTransitionEnd();
  const {stepValue, lastXValue, numberOfSteps} = useMemo(
    () => getValueData(data),
    [data],
  );

  const barWidth = windowWidth - Y_AXIS_WIDTH - SCREEN_SIDE_OFFSET * 2;
  const sharedValue = useSharedValue(-1);

  const lastElement = data[data.length - 1];

  useEffect(() => {
    if (transitionEnd && lastElement?.value != null && data.length) {
      sharedValue.value = -1;
      const handle = requestAnimationFrame(() => {
        sharedValue.value = withTiming(0, {duration: 300});
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [transitionEnd, lastElement?.value, data.length, sharedValue]);

  return (
    <Animated.FlatList
      contentContainerStyle={[styles.contentContainer, tabbarOffset.current]}
      ListHeaderComponentStyle={styles.header}
      data={data}
      initialNumToRender={14}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      getItemLayout={(_, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
      renderItem={({item, index}) => (
        <BarItem
          item={item}
          maxWidth={barWidth}
          maxValue={lastXValue}
          sharedValue={sharedValue}
          doAnimate={Math.floor(screenHeight / ROW_HEIGHT) > index}
        />
      )}
      ListFooterComponent={
        <BarFooter
          barWidth={barWidth}
          stepValue={stepValue}
          numberOfSteps={numberOfSteps}
        />
      }
      ListHeaderComponent={ListHeader}
    />
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    flexGrow: 1,
  },
  header: {
    marginLeft: -SCREEN_SIDE_OFFSET,
    marginRight: -SCREEN_SIDE_OFFSET,
  },
});