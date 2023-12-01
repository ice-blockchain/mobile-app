// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoIcon} from '@svg/InfoIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const EthereumAddressWarning = ({style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.warningCard}>
        <InfoIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.white}
          secondaryColor={COLORS.attention}
        />
        <Text style={styles.warningText}>
          {replaceString(
            t('ethereum_address.self_custodial_addr_warning_text'),
            tagRegex('bold', false),
            (match, index) => (
              <Text key={match + index} style={styles.boldStyle}>
                {match}
              </Text>
            ),
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warningCard: {
    backgroundColor: COLORS.attention,
    flexDirection: 'row',
    borderRadius: rem(16),
    padding: rem(12),
    alignItems: 'center',
  },
  warningText: {
    ...font(13, 18, 'medium'),
    marginStart: rem(12),
    flex: 1,
  },
  boldStyle: {
    ...font(13, 18, 'bold'),
  },
});
