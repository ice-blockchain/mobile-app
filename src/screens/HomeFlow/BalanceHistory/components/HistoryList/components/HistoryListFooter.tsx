// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ArrowCircleDashed} from '@svg/ArrowCircleDashed';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const HistoryListFooter = () => {
  return (
    <View style={styles.container}>
      <ArrowCircleDashed color={COLORS.periwinkleGray} style={styles.icon} />
      <Text style={styles.labelText}>
        {t('balance_history.list_end_label')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(20),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: rem(18),
    marginHorizontal: rem(30),
  },
  icon: {
    position: 'absolute',
    left: 0,
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  labelText: {
    ...font(13, 17, 'medium', 'periwinkleGray'),
  },
});
