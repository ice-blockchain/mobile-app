// SPDX-License-Identifier: ice License 1.0

import {
  FilterButton,
  FilterButtonDivider,
} from '@components/Buttons/FilterButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ResetFilterButton} from '@screens/HomeFlow/BalanceHistory/components/Filters/components/ResetFilterButton';
import {buildDateRangeText} from '@screens/HomeFlow/BalanceHistory/components/Filters/utils/buildDateRangeText';
import {dayjs} from '@services/dayjs';
import {CalendarIcon} from '@svg/CalendarIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {SharedValue} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  setSelectedFilter: (filter: Filter) => void;
  selectedFilter: Filter;
  translateY: SharedValue<number>;
};

export type Filter = {
  type: 'custom' | 'day' | 'week' | 'month';
  start: string;
  end: string;
};

export const FAST_FILTERS: {[key: string]: Filter} = {
  get DAY() {
    const now = dayjs().utc();
    return {
      type: 'day',
      start: now.format(),
      end: now.subtract(1, 'day').format(),
    } as const;
  },
  get WEEK() {
    const now = dayjs().utc();
    return {
      type: 'week',
      start: now.format(),
      end: now.subtract(1, 'week').format(),
    } as const;
  },
  get MONTH() {
    const now = dayjs().utc();
    return {
      type: 'month',
      start: now.format(),
      end: now.subtract(1, 'month').format(),
    } as const;
  },
};

export const Filters = ({
  setSelectedFilter,
  selectedFilter,
  translateY,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const {shadowStyle} = useScrollShadow({translateY});

  const onCustomDateFilterPress = () => {
    navigation.navigate('DateSelect', {
      onSelect: period => {
        if (period.start && period.end) {
          /**
           * Reversing, because from the calendar dates are coming
           * in a normal time order (start is earlier than end)
           * but for the history we need the backwards order.
           */
          const startDay = dayjs(period.end);
          const endDay = dayjs(period.start);
          setSelectedFilter({
            type: 'custom',
            /**
             * Including the hours of the most recent day (start day)
             * since from the calendar dates are coming without time
             * so after formatting they are pointing to the start of a day (00:00:00)
             * In case of the start day is today, setting it to the "now"
             */
            start: startDay.isToday()
              ? dayjs().utc().format()
              : startDay.utc().add(1, 'd').subtract(1, 's').format(),
            end: endDay.utc().format(),
          });
        } else if (selectedFilter.type === 'custom') {
          setFilter(FAST_FILTERS.DAY);
        }
      },
    });
  };

  const setFilter = (filter: Filter) => {
    if (selectedFilter.type !== filter.type) {
      setSelectedFilter(filter);
    }
  };

  return (
    <Animated.View
      style={[styles.container, commonStyles.baseSubScreen, shadowStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <FilterButton
          onPress={onCustomDateFilterPress}
          label={
            selectedFilter?.type === 'custom'
              ? buildDateRangeText(selectedFilter.start, selectedFilter.end)
              : t('date_select.title')
          }
          icon={
            <CalendarIcon
              width={rem(12)}
              height={rem(12)}
              color={COLORS.white}
            />
          }
          button={
            selectedFilter?.type === 'custom' && (
              <ResetFilterButton onPress={() => setFilter(FAST_FILTERS.DAY)} />
            )
          }
          preset={'dark'}
          selected={selectedFilter?.type === 'custom'}
        />
        <FilterButtonDivider />
        <FilterButton
          onPress={() => setFilter(FAST_FILTERS.DAY)}
          label={t('periods.1_day')}
          preset={'light'}
          selected={selectedFilter?.type === 'day'}
        />
        <FilterButton
          onPress={() => setFilter(FAST_FILTERS.WEEK)}
          label={t('periods.1_week')}
          preset={'light'}
          selected={selectedFilter?.type === 'week'}
        />
        <FilterButton
          onPress={() => setFilter(FAST_FILTERS.MONTH)}
          label={t('periods.1_month')}
          preset={'light'}
          selected={selectedFilter?.type === 'month'}
        />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  scrollContent: {
    flexGrow: 0,
    paddingHorizontal: rem(12),
    paddingTop: rem(18),
    paddingBottom: rem(6),
  },
});
