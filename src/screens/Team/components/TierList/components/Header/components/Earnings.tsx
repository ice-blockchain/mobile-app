// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {isRTL, t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {referralType: ReferralType};

export const Earnings = ({referralType}: Props) => {
  const isEnglishLocale = useIsEnglishLocale();
  const balanceSummary = useSelector(balanceSummarySelector);
  const balance = balanceSummary?.[referralType === 'T1' ? 't1' : 't2'];
  const title =
    referralType === 'T1'
      ? t('team.tier_one.header_list.title_earnings')
      : t('team.tier_two.header_list.title_earnings');
  return (
    <View style={styles.container}>
      {isEnglishLocale ? <Text style={styles.label}>{`${title}:`}</Text> : null}
      {!isRTL && <Text style={styles.value}> </Text>}
      <FormattedNumber
        trim={!isRTL}
        bodyStyle={styles.value}
        decimalsStyle={styles.valueDecimals}
        number={balance ? formatNumberString(balance) : '0'}
      />
      {!isRTL && <Text style={styles.value}> </Text>}

      <IceLabel
        textStyle={styles.value}
        iconSize={16}
        color={COLORS.primaryDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    ...font(14, null, 'regular', 'secondary'),
  },
  value: {
    ...font(14, null, 'regular', 'primaryDark'),
  },
  valueDecimals: {
    ...font(8, null, 'bold', 'primaryDark'),
  },
});
