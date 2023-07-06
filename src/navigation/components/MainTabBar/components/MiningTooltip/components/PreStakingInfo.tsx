// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
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
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PreStakingInfo = () => {
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
      <View style={styles.container}>
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
        />
        <DataCellSeparator />
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
          currency={<IceLabel color={COLORS.primaryDark} />}
        />
      </View>
      <Image
        style={styles.stakeManImage}
        source={require('../assets/images/stakeMan.png')}
      />
      <View style={styles.bonus}>
        <Chevron
          style={styles.bonusChevron}
          fill={COLORS.aliceBlue}
          width={rem(32)}
          height={rem(23)}
        />
        <GraphUpIcon
          color={COLORS.primaryLight}
          width={rem(18)}
          height={rem(18)}
        />
        <Touchable onPress={handlePress}>
          <Text style={styles.bonusLabelText}>{t('staking.bonus_label')}</Text>
        </Touchable>

        {miningRates && (
          <Text style={styles.bonusValueText}>
            +{miningRates.total.bonuses?.preStaking ?? 0}%
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(18),
  },
  stakeManImage: {
    width: rem(114),
    height: rem(134),
    position: 'absolute',
    top: -rem(64),
    alignSelf: 'center',
  },
  bonus: {
    marginTop: rem(20),
    backgroundColor: COLORS.aliceBlue,
    minHeight: rem(40),
    marginHorizontal: rem(24),
    marginBottom: rem(20),
    borderRadius: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusChevron: {
    position: 'absolute',
    bottom: -rem(18),
  },
  bonusLabelText: {
    marginLeft: rem(8),
    textTransform: 'uppercase',
    ...font(14, 19, 'medium', 'primaryLight'),
  },
  bonusValueText: {
    marginLeft: rem(4),
    ...font(17, 22, 'bold', 'primaryLight'),
  },
  dataCellValue: {
    ...font(17, 22, 'bold', 'primaryDark'),
  },
});
