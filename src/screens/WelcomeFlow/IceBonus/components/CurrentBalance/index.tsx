// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {smallHeightDevice} from '@constants/styles';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: string;
};

export const CurrentBalance = ({value}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/curve.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.body}>
        <Text style={styles.labelText}>
          {t('ice_bonus.balance_label').toUpperCase()}
        </Text>
        <View style={styles.valueRow}>
          <FormattedNumber
            number={`+${value}`}
            bodyStyle={styles.valueText}
            decimalsStyle={styles.valueDecimalsText}
          />
          <IceLabel
            iconSize={20}
            style={styles.iceLabel}
            textStyle={styles.iceLabelText}
            iconOffsetY={1}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: smallHeightDevice ? rem(120) : rem(170),
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: rem(170),
    height: rem(170),
    left: rem(20),
    top: 0,
  },
  body: {
    marginHorizontal: rem(35),
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(24),
    paddingVertical: rem(10),
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    ...font(12, 16, 'semibold', 'white', 'center'),
  },
  valueText: {
    ...font(32, 40, 'black'),
  },
  valueDecimalsText: {
    ...font(18, 24, 'regular'),
  },
  iceLabel: {
    marginLeft: rem(6),
  },
  iceLabelText: {
    ...font(24, 30, 'bold'),
  },
});
