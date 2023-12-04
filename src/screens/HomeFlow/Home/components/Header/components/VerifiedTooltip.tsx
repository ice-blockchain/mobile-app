// SPDX-License-Identifier: ice License 1.0

import {Tooltip} from '@components/Tooltip';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

export const TOOLTIP_WIDTH = rem(111);
export const TOOLTIP_HEIGHT = rem(27);

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const VerifiedTooltip = ({style}: Props = {}) => {
  return (
    <Tooltip
      animated={false}
      style={[styles.container, style]}
      chevronStyle={styles.chevron}>
      <Text style={styles.tooltipText}>{t('home.verified_tooltip.title')}</Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.downriver,
    width: TOOLTIP_WIDTH,
    minHeight: TOOLTIP_HEIGHT,
    paddingHorizontal: rem(16),
    paddingVertical: rem(6),
    borderRadius: rem(16),
    position: 'absolute',
    justifyContent: 'center',
  },
  tooltipText: {
    ...font(14, 20, 'medium', 'white', 'center'),
  },
  chevron: {
    position: 'absolute',
    top: -rem(8),
    alignSelf: 'center',
  },
});
