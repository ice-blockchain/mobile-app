// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Chevron} from '@navigation/components/MainTabBar/components/MiningTooltip/assets/svg/Chevron';
import {GraphUpIcon} from '@navigation/components/MainTabBar/components/MiningTooltip/assets/svg/GraphUpIcon';
import {
  DataCell,
  DataCellSeparator,
} from '@navigation/components/MainTabBar/components/MiningTooltip/components/DataCell';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  balanceSummarySelector,
  miningRatesSelector,
  preStakingSummarySelector,
} from '@store/modules/Tokenomics/selectors';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {YearsOutlineIcon} from '@svg/YearsOutlineIcon';
import {isRTL, t} from '@translations/i18n';
import {
  formatNumber,
  formatNumberString,
  removeZeroDigits,
} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  oneColumn?: boolean;
};

export const PreStakingInfo = ({oneColumn}: Props) => {
  const miningRates = useSelector(miningRatesSelector);
  const preStakingSummary = useSelector(preStakingSummarySelector);
  const balanceSummary = useSelector(balanceSummarySelector);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handlePress = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate('Staking');
    }, 300);
  };

  return (
    <>
      <View
        style={[styles.container, oneColumn ? styles.columnContainer : null]}>
        <DataCell
          icon={
            <YearsOutlineIcon
              width={rem(23)}
              height={rem(22)}
              color={COLORS.primaryLight}
            />
          }
          label={t('staking.period_label')}
          value={
            preStakingSummary?.years
              ? `${preStakingSummary.years} ${t('global.years').toLowerCase()}`
              : null
          }
          row={oneColumn}
        />
        {oneColumn ? (
          <View style={styles.columnSeparator} />
        ) : (
          <DataCellSeparator />
        )}
        <DataCell
          icon={
            <CoinsStackIcon
              width={rem(18)}
              height={rem(18)}
              color={COLORS.primaryLight}
            />
          }
          label={t('staking.balance_label')}
          value={
            <>
              <Text style={styles.dataCellValue}>
                {isRTL && <Text> </Text>}
                {balanceSummary &&
                  formatNumberString(balanceSummary.preStaking)}
              </Text>
            </>
          }
          currency={<IceLabel reversed={isRTL} color={COLORS.primaryDark} />}
          row={oneColumn}
        />
      </View>
      <Image
        style={styles.stakeManImage}
        source={require('../assets/images/stakeMan.png')}
      />
      <Touchable onPress={handlePress}>
        <View style={[styles.bonus, oneColumn ? styles.bonusOneColumn : null]}>
          <Chevron
            style={styles.bonusChevron}
            fill={COLORS.aliceBlue}
            width={rem(32)}
            height={rem(23)}
          />
          <Text style={styles.bonusLabelText}>
            <GraphUpIcon
              color={COLORS.primaryLight}
              width={rem(18)}
              height={rem(18)}
            />
            {`  ${t('staking.bonus_label')}`}
            {oneColumn && miningRates ? '\n' : ' '}
            {miningRates && (
              <Text style={styles.bonusValueText}>
                +
                {removeZeroDigits(
                  formatNumber(miningRates.total.bonuses?.preStaking ?? 0, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                )}
                %
              </Text>
            )}
          </Text>
        </View>
      </Touchable>
    </>
  );
};

export const STACK_MAN_HEIGHT = rem(134);
export const STACK_MAN_OVERFLOW = rem(64);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_SIDE_OFFSET,
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  columnSeparator: {
    height: rem(16),
  },
  stakeManImage: {
    width: rem(114),
    height: STACK_MAN_HEIGHT,
    position: 'absolute',
    top: -STACK_MAN_OVERFLOW,
    alignSelf: 'center',
  },
  bonus: {
    marginVertical: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.aliceBlue,
    marginHorizontal: rem(24),
    borderRadius: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: rem(10),
  },
  bonusOneColumn: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  bonusChevron: {
    position: 'absolute',
    bottom: -rem(18),
    padding: rem(10),
  },
  bonusLabelText: {
    textTransform: 'uppercase',
    ...font(14, 19, 'medium', 'primaryLight', 'center'),
  },
  bonusValueText: {
    ...font(17, 22, 'bold', 'primaryLight', 'center'),
  },
  dataCellValue: {
    ...font(17, 22, 'bold', 'primaryDark'),
  },
});
