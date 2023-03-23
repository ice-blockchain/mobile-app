// SPDX-License-Identifier: ice License 1.0

import {smallHeightDevice} from '@constants/styles';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const DIVIDER_VERTICAL_MARGIN = smallHeightDevice ? rem(18) : rem(28);

export const Divider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.orText}>{t('signIn.or')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: DIVIDER_VERTICAL_MARGIN,
    marginBottom: DIVIDER_VERTICAL_MARGIN - rem(5),
  },
  orText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    ...font(10, 12, 'regular', 'secondary'),
  },
});
