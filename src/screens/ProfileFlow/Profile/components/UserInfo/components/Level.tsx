// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

const SIZE = rem(66);

type Props = {
  value: number | string;
};

export const Level = ({value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{t('global.level').toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS.midnight,
    alignContent: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.primary.black,
    fontSize: font(17),
    lineHeight: font(21),
  },
  labelText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.primary.bold,
    fontSize: font(10),
    lineHeight: font(12),
    marginTop: 2,
  },
});
