// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {useCountdown} from '@hooks/useCountdown';
import {
  DataCell,
  DataCellSeparator,
} from '@navigation/components/MainTabBar/components/MiningTooltip/components/DataCell';
import {useNavigation} from '@react-navigation/native';
import {dayjs} from '@services/dayjs';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {
  miningRatesSelector,
  miningSessionSelector,
} from '@store/modules/Tokenomics/selectors';
import {ClockIcon} from '@svg/ClockIcon';
import {LogoIcon} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import {getDurationString} from '@utils/date';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const MiningInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const miningSession = useSelector(miningSessionSelector);
  const miningRates = useSelector(miningRatesSelector);

  const duration = useMemo(
    () =>
      miningSession
        ? dayjs.duration(dayjs(miningSession.endedAt).diff())
        : dayjs.duration(0),
    [miningSession],
  );
  const {durationLeft, isCountdownOver} = useCountdown(duration);

  useEffect(() => {
    if (isCountdownOver) {
      dispatch(TokenomicsActions.GET_MINING_SUMMARY.START.create());
      navigation.goBack();
    }
  }, [dispatch, isCountdownOver, navigation]);

  return (
    <View style={styles.container}>
      <DataCell
        icon={
          <ClockIcon
            width={rem(25)}
            height={rem(24)}
            color={COLORS.primaryLight}
          />
        }
        label={t('staking.time_left')}
        value={getDurationString(durationLeft)}
      />
      <DataCellSeparator />
      <DataCell
        icon={
          <LogoIcon
            width={rem(24)}
            height={rem(24)}
            color={COLORS.primaryLight}
          />
        }
        label={t('staking.mining_rate')}
        value={
          miningRates && (
            <FormattedNumber
              number={`${
                {positive: '+', negative: '-', none: ''}[miningRates.type] ?? ''
              }${formatNumberString(miningRates.total.amount)}`}
              bodyStyle={styles.valueText}
              decimalsStyle={styles.valueDecimalsText}
            />
          )
        }
        currency={<IceLabel color={COLORS.primaryDark} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
  },
  valueText: {
    ...font(17, 20, 'bold', 'primaryDark'),
  },
  valueDecimalsText: {
    ...font(10, 12, 'bold', 'primaryDark'),
  },
});
