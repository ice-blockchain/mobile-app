// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DataCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/DataCell';
import {Coordinates} from '@screens/Modals/types';
import {LogoIcon} from '@svg/LogoIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  value: string | ReactNode;
  currency?: ReactNode;
};

export const BlockchainCell = ({value, currency}: Props) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList & HomeTabStackParamList>
    >();
  const onInfoPress = (coordinates: Coordinates) => {
    navigation.navigate('BalanceHistoryTooltip', {
      coords: coordinates,
    });
  };
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
          <IceLabel reversed={isRTL} iconOffsetY={3.5} color={COLORS.white} />
        )
      }
      onInfoIconPressed={onInfoPress}
    />
  );
};

const styles = StyleSheet.create({
  valueText: {
    ...font(15, 17, 'bold'),
  },
  valueDecimalsText: {
    ...font(9, 11, 'bold'),
  },
});
