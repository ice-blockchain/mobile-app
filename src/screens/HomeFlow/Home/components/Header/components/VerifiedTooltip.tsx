// SPDX-License-Identifier: ice License 1.0

import {Tooltip} from '@components/Tooltip';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const VerifiedTooltip = () => {
  return (
    <Tooltip
      animated={true}
      style={styles.container}
      chevronStyle={styles.chevron}>
      <Text style={styles.tooltipText}>{t('home.verified_tooltip.title')}</Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.downriver,
    width: rem(111),
    minHeight: rem(27),
    paddingHorizontal: rem(16),
    paddingVertical: rem(6),
    borderRadius: rem(16),
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // bottom: rem(80),
  },
  tooltipText: {
    ...font(12, 16, 'black', 'white', 'center'),
  },
  chevron: {
    position: 'absolute',
    top: -rem(8),
    alignSelf: 'center',
  },
});
