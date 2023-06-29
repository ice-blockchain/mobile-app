// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const GreetingText = () => {
  const hours = dayjs().hour();
  const greeting =
    hours >= 5 && hours < 12
      ? t('general.good_morning')
      : hours >= 12 && hours < 17
      ? t('general.good_afternoon')
      : t('general.good_evening');
  return <Text style={styles.greetingsText}>{greeting},</Text>;
};

const styles = StyleSheet.create({
  greetingsText: {
    ...font(15, 20, 'regular', 'downriver'),
  },
});
