// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
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
import {isRTL, t} from '@translations/i18n';
import {getDurationString} from '@utils/date';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  oneColumn?: boolean;
};

export const MiningInfo = ({oneColumn}: Props) => {
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
    <View style={[styles.container, oneColumn ? styles.column : null]}>
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
        row={oneColumn}
      />
      {oneColumn ? (
        <View style={styles.columnSeparator} />
      ) : (
        <DataCellSeparator />
      )}
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
              }${formatNumberString(
                isLightDesign && miningRates?.type !== 'negative'
                  ? miningRates.base.amount
                  : miningRates.total.amount,
              )}`}
              bodyStyle={styles.valueText}
              decimalsStyle={styles.valueDecimalsText}
            />
          )
        }
        currency={<IceLabel reversed={isRTL} color={COLORS.primaryDark} />}
        row={oneColumn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_SIDE_OFFSET,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: SCREEN_SIDE_OFFSET,
  },
  columnSeparator: {
    height: rem(16),
  },
  valueText: {
    ...font(17, 22, 'bold', 'primaryDark'),
  },
  valueDecimalsText: {
    ...font(10, 14, 'bold', 'primaryDark'),
  },
});
