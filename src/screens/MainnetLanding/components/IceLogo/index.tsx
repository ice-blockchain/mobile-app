// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const IceLogo = () => {
  return (
    <View style={styles.container}>
      <LogoIcon color={COLORS.white} width={rem(28)} height={rem(28)} />
      <Text style={styles.labelText}>{t('general.ice').toLowerCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    ...font(26, undefined, 'bold'),
    marginStart: rem(4),
  },
});
