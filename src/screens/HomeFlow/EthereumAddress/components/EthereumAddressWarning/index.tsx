// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoIcon} from '@svg/InfoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const EthereumAddressWarning = ({style}: Props) => {
  return (
    <View style={style}>
      <View style={styles.warningCard}>
        <InfoIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.white}
          secondaryColor={COLORS.attention}
        />
        <Text style={styles.warningText}>
          {t('ethereum_address.enter_address_warning')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
