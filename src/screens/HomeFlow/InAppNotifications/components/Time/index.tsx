// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface TimeProps {
  time?: Date | string | null;
}

export const Time = ({time}: TimeProps) => {
  return <Text style={styles.timeLabel}>{dayjs(time).fromNow() || ''}</Text>;
};

const styles = StyleSheet.create({
  timeLabel: {
    position: 'absolute',
    right: -5,
    top: -5,
    ...font(10, 13, 'regular', 'secondary', 'right'),
  },
});
