// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {DataCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/DataCell';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  value: string | ReactNode;
  currency?: ReactNode;
};

export const BlockchainCell = ({value, currency}: Props) => {
  return (
    <DataCell
      icon={
        <LogoIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.primaryLight}
        />
      }
      label={t('balance_history.blockchain')}
      value={
        typeof value === 'string' ? (
          <FormattedNumber
            number={value}
            bodyStyle={styles.valueText}
            decimalsStyle={styles.valueDecimalsText}
          />
        ) : (
          value
        )
      }
      currency={
        currency ?? (
          <IceLabel iconOffsetY={isAndroid ? 2 : 1} color={COLORS.white} />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  valueText: {
    ...font(15, 18, 'bold'),
  },
  valueDecimalsText: {
    ...font(9, 10, 'bold'),
  },
});
