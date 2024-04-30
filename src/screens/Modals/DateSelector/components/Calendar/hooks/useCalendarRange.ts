// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {dayjs} from '@services/dayjs';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {CalendarUtils} from 'react-native-calendars';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import {DateData, MarkedDates} from 'react-native-calendars/src/types';
import {rem} from 'rn-units';

type CalendarRange = {
  startDate: string | null;
  endDate: string | null;
  marked: MarkedDates;
};

export const useCalendarRange = () => {
  const [calendarRange, setCalendarRange] = useState<CalendarRange>({
    marked: {},
    startDate: null,
    endDate: null,
  });

  const onDayPress = (day: DateData) => {
    const range = buildCalendarRange(calendarRange.marked, day);
    setCalendarRange(range);
  };

  const reset = () =>
    setCalendarRange({
      marked: {},
      startDate: null,
      endDate: null,
    });

  return {calendarRange, onDayPress, reset};
};

const buildCalendarRange = (
  currentlyMarked: MarkedDates,
  selectedDay: DateData,
): {marked: MarkedDates; startDate: string; endDate: string} => {
  if (Object.keys(currentlyMarked).length !== 1) {
    return {
      marked: {
        [selectedDay.dateString]: {
          startingDay: true,
          endingDay: true,
          color: COLORS.primaryLight,
          textColor: COLORS.white,
          customContainerStyle: styles.customContainerStyle,
        },
      },
      startDate: selectedDay.dateString,
      endDate: selectedDay.dateString,
    };
  } else {
    if (currentlyMarked[selectedDay.dateString]) {
      return {
        marked: currentlyMarked,
        startDate: selectedDay.dateString,
        endDate: selectedDay.dateString,
      };
    }

    const markedDate = Object.keys(currentlyMarked)[0];
    const startDate =
      markedDate > selectedDay.dateString ? selectedDay.dateString : markedDate;
    const endDate =
      startDate === markedDate ? selectedDay.dateString : markedDate;

    const marked: {
      [key: string]: MarkingProps;
    } = {};

    let filler = dayjs(startDate);
    const end = dayjs(endDate);
    while (filler.isBefore(end)) {
      filler = filler.add(1, 'day');
      marked[CalendarUtils.getCalendarDateString(filler.toDate())] = {
        color: COLORS.secondaryFaint,
      };
    }

    marked[startDate] = {
      startingDay: true,
      color: COLORS.primaryLight,
      fillerColor: COLORS.secondaryFaint,
      textColor: COLORS.white,
      customContainerStyle: styles.customContainerStyle,
    };
    marked[endDate] = {
      endingDay: true,
      color: COLORS.primaryLight,
      fillerColor: COLORS.secondaryFaint,
      textColor: COLORS.white,
      customContainerStyle: styles.customContainerStyle,
    };
    return {marked, startDate, endDate};
  }
};

const styles = StyleSheet.create({
  customContainerStyle: {width: rem(34)},
});
