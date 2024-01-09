// SPDX-License-Identifier: ice License 1.0

import {
  BarFooter,
  BarItem,
  getValueData,
  ROW_HEIGHT,
  Y_AXIS_WIDTH,
} from '@components/BarGraph';
import {useGetUserGrowthBarGraphDataForStatsPeriod} from '@components/BarGraph/hooks/useGetUserGrowthBarGraphDataForStatsPeriod';
import {LinesBackground} from '@components/LinesBackground';
import {DropDownMenu} from '@components/Menu/DropDownMenu';
import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useScreenTransitionEnd} from '@navigation/hooks/useScreenTransitionEnd';
import {HomeTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {STATS_PERIODS} from '@store/modules/Stats/constants';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {rem, screenHeight} from 'rn-units';

import {useOnRefresh} from './hooks/useOnRefresh';

const PERIODS: {label: string; period: StatsPeriod}[] = STATS_PERIODS.map(
  (period: StatsPeriod) => ({label: t(`periods.${period}_days`), period}),
);

/**
 * Not used
 */
export const UserGrowthGraph = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {
    params: {category, statsPeriod: paramsStatsPeriod},
  } = useRoute<RouteProp<HomeTabStackParamList, 'UserGrowthGraph'>>();
  const [periodIndex, setPeriodIndex] = useState(0);
  const [statsPeriod, setStatsPeriod] = useState(paramsStatsPeriod);

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
    useGetUserGrowthBarGraphDataForStatsPeriod(statsPeriod);

  const handleRef = useRef<{cancel: () => void} | undefined>();
  const onPeriodChange = (index: number) => {
    setPeriodIndex(index);
    handleRef.current = InteractionManager.runAfterInteractions(() => {
      setStatsPeriod(PERIODS[index]?.period ?? 3);
    });
  };

  useEffect(() => {
    return () => {
      handleRef.current?.cancel();
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
      <PullToRefreshContainer
        style={commonStyles.flexOne}
        theme={'dark-content'}
        refreshing={refreshing}
        onRefresh={onRefresh}>
        <Animated.FlatList
          contentContainerStyle={[
            styles.contentContainer,
            tabbarOffset.current,
          ]}
          data={data}
          initialNumToRender={14}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          onLayout={event => setWidth(event.nativeEvent.layout.width)}
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
              type={'active_users'}
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
                  <DropDownMenu
                    selectedIndex={periodIndex}
                    options={PERIODS}
                    onChange={onPeriodChange}
                  />
                }
              />
            </View>
          }
        />
      </PullToRefreshContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingTop: rem(16),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingBottom: SCREEN_SIDE_OFFSET,
    flexGrow: 1,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    marginHorizontal: -SCREEN_SIDE_OFFSET,
    paddingBottom: SCREEN_SIDE_OFFSET,
  },
});
