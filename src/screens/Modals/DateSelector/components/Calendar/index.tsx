// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
// eslint-disable-next-line no-restricted-imports
import {FONT_WEIGHTS, FONTS} from '@constants/fonts';
import {useCalendarRange} from '@screens/Modals/DateSelector/components/Calendar/hooks/useCalendarRange';
import {buildDateRangeText} from '@screens/Modals/DateSelector/components/Calendar/utils/buildDateRangeText';
import {ChevronIcon} from '@svg/ChevronIcon';
import {isRTL} from '@translations/i18n';
import {font, mirrorTransform} from '@utils/styles';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Calendar as CalendarComponent,
  CalendarUtils,
} from 'react-native-calendars';
import {Theme} from 'react-native-calendars/src/types';
import {rem} from 'rn-units';

type Props = {
  onPeriodSelect: (start: string | null, end: string | null) => void;
};

export type CalendarMethods = {
  reset: () => void;
};

export const Calendar = memo(
  forwardRef<CalendarMethods, Props>(({onPeriodSelect}, forwardedRef) => {
    const {calendarRange, onDayPress, reset} = useCalendarRange();

    useEffect(() => {
      onPeriodSelect(calendarRange.startDate, calendarRange.endDate);
    }, [calendarRange, onPeriodSelect]);

    useImperativeHandle(forwardedRef, () => ({reset}));

    const theme: Theme = useMemo(
      () => ({
        textDayFontSize: rem(12),
        textDayFontWeight: FONT_WEIGHTS.medium,
        textDayFontFamily: FONTS.primary.medium,
        dayTextColor: COLORS.primaryDark,
        textMonthFontSize: rem(15),
        textMonthFontWeight: FONT_WEIGHTS.regular,
        textMonthFontFamily: FONTS.primary.regular,
        monthTextColor: COLORS.primaryDark,
        textDayHeaderFontSize: rem(12),
        textDayHeaderFontWeight: FONT_WEIGHTS.semibold,
        textDayHeaderFontFamily: FONTS.primary.semibold,
        textSectionTitleColor: COLORS.secondary,
      }),
      [],
    );

    const maxDate = useMemo(
      () => CalendarUtils.getCalendarDateString(new Date()),
      [],
    );

    return (
      <View>
        <Text
          style={styles.selectedText}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {calendarRange.startDate && calendarRange.endDate
            ? buildDateRangeText(calendarRange.startDate, calendarRange.endDate)
            : ''}
        </Text>
        <CalendarComponent
          style={styles.calendar}
          headerStyle={styles.header}
          onDayPress={onDayPress}
          markedDates={calendarRange.marked}
          markingType={'period'}
          theme={theme}
          maxDate={maxDate}
          renderArrow={direction => (
            <ChevronIcon
              style={[styles.arrows, direction === 'left' && styles.arrowLeft]}
              width={rem(10)}
              height={rem(20)}
            />
          )}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  selectedText: {
    position: 'absolute',
    top: rem(20),
    left: 0,
    right: 0,
    ...font(17, 22, 'semibold', 'primaryDark', 'center'),
  },
  calendar: {
    marginTop: rem(40),
    width: rem(265),
    alignSelf: 'center',
  },
  header: {
    marginTop: rem(10),
  },
  arrows: {
    ...mirrorTransform(),
  },
  arrowLeft: {
    transform: [{rotate: isRTL ? '0deg' : '180deg'}],
  },
});
