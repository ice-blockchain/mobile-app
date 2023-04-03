// SPDX-License-Identifier: ice License 1.0

import {
  BarFooter,
  BarItem,
  getValueData,
  ROW_HEIGHT,
  Y_AXIS_WIDTH,
} from '@components/BarGraph';
import {useGetBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetBarGraphDataForStatsPeriod';
import {LinesBackground} from '@components/LinesBackground';
import {RefreshControl} from '@components/RefreshControl';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useScreenTransitionEnd} from '@navigation/hooks/useScreenTransitionEnd';
import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PeriodSelect} from '@screens/HomeFlow/Stats/components/UsersGrowthGraph/components/PeriodSelect';
import {STATS_PERIODS} from '@store/modules/Stats/constants';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  InteractionManager,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {rem, screenHeight} from 'rn-units';

import {useOnRefresh} from './hooks/useOnRefresh';

const PERIODS: {label: string; period: StatsPeriod}[] = STATS_PERIODS.map(
  (period: StatsPeriod) => ({label: t(`periods.${period}_days`), period}),
);

export const UserGrowthGraph = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {
    params: {category, statsPeriod: paramsStatsPeriod},
  } = useRoute<RouteProp<HomeTabStackParamList, 'UserGrowthGraph'>>();
  const [periodIndex, setPeriodIndex] = useState(0);
  const [statsPeriod, setStatsPeriod] = useState(paramsStatsPeriod);

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(({contentOffset: {y}}) => {
    translateY.value = y;
  });

  const {refreshing, onRefresh} = useOnRefresh({
    statsPeriod,
  });

  useEffect(() => {
    setStatsPeriod(paramsStatsPeriod);
    const index = PERIODS.findIndex(
      period => period.period === paramsStatsPeriod,
    );
    setPeriodIndex(index >= 0 ? index : 0);
  }, [paramsStatsPeriod]);

  const {activeUsersData, totalUsersData} =
    useGetBarGraphDataForStatsPeriod(statsPeriod);

  const handleRef = useRef<{cancel: () => void} | undefined>();
  const onPeriodChange = (index: number) => {
    setPeriodIndex(index);
    handleRef.current = InteractionManager.runAfterInteractions(() => {
      setStatsPeriod(PERIODS[index]?.period ?? 3);
    });
  };

  useEffect(() => {
    return () => {
      if (handleRef.current) {
        handleRef.current?.cancel();
      }
    };
  }, []);

  const {transitionEnd} = useScreenTransitionEnd();
  const [width, setWidth] = useState(0);
  const isTotal = category === 'total';
  const data = isTotal ? totalUsersData : activeUsersData;
  const {stepValue, lastXValue, numberOfSteps} = useMemo(
    () => getValueData(data),
    [data],
  );

  const barWidth = width - Y_AXIS_WIDTH - SCREEN_SIDE_OFFSET * 2;
  const sharedValue = useSharedValue(-1);

  const lastElement = data[data.length - 1];

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: {width: layoutWidth},
      },
    }: LayoutChangeEvent) => {
      setWidth(layoutWidth);
    },
    [],
  );

  useEffect(() => {
    if (width && transitionEnd && lastElement?.value != null && data.length) {
      sharedValue.value = -1;
      const handle = requestAnimationFrame(() => {
        sharedValue.value = withTiming(0, {duration: 300});
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [transitionEnd, width, lastElement?.value, data.length, sharedValue]);

  return (
    <View style={styles.container}>
      <LinesBackground />
      <Header
        color={COLORS.white}
        title={t('stats.user_growth')}
        backgroundColor={'transparent'}
      />
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={14}
        contentContainerStyle={[styles.contentContainer, tabbarOffset.current]}
        style={styles.flatListContainer}
        data={data}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        onLayout={onLayout}
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
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <SectionHeader
              title={isTotal ? t('stats.total') : t('stats.active')}
              action={
                <PeriodSelect
                  selectedIndex={periodIndex}
                  options={PERIODS}
                  onChange={onPeriodChange}
                />
              }
            />
          </View>
        }
        refreshControl={
          <RefreshControl
            theme={'light-content'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            translateY={translateY}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flatListContainer: {
    paddingTop: rem(16),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingBottom: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },
  contentContainer: {
    minHeight: screenHeight,
  },
  headerContainer: {
    marginHorizontal: -SCREEN_SIDE_OFFSET,
    paddingBottom: SCREEN_SIDE_OFFSET,
  },
});
