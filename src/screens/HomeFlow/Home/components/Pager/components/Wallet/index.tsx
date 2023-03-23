// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {ArrowDown} from '@svg/ArrowDown';
import {ArrowUp} from '@svg/ArrowUp';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

import {TotalBalanceValue} from './components/TotalBalanceValue';
import {TotalMiningRateValue} from './components/TotalMiningRateValue';

const INFO_ICON_SIZE = rem(16);

export const Wallet = memo(() => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRates = useSelector(miningRatesSelector);

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  if (!balanceSummary || !miningRates) {
    //TODO: add loading
    return null;
  }

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <Text style={styles.balanceLabelText}>{t('home.wallet.balance')}</Text>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceValue}>
          {
            {
              positive: (
                <View style={styles.balanceValueArrow}>
                  <ArrowUp color={COLORS.white} />
                </View>
              ),
              negative: (
                <View
                  style={[
                    styles.balanceValueArrow,
                    styles.balanceValueArrowNegative,
                  ]}>
                  <ArrowDown color={COLORS.white} />
                </View>
              ),
              none: '',
            }[miningRates.type]
          }

          <TotalBalanceValue style={styles.balanceValueContainer} />

          <IceLabel
            textStyle={styles.balanceCurrencyText}
            iconOffsetY={isAndroid ? -2 : 0}
            iconSize={rem(20)}
          />
        </View>
        <Touchable
          hitSlop={SMALL_BUTTON_HIT_SLOP}
          style={styles.infoButton}
          onPress={() => navigation.navigate('BalanceHistory')}>
          <InfoOutlineIcon
            color={COLORS.shamrock}
            width={INFO_ICON_SIZE}
            height={INFO_ICON_SIZE}
          />
        </Touchable>
      </View>
      <View style={styles.miningRate}>
        <Text style={styles.rateLabelText}>{t('home.wallet.rate')}</Text>

        <TotalMiningRateValue style={styles.rateValueContainer} />

        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={0}
          iconSize={18}
          label={t('general.ice_per_hour')}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
    height: PAGE_HEIGHT + rem(30),
    marginBottom: -rem(30),
    alignItems: 'center',
  },
  balanceLabelText: {
    marginTop: rem(32),
    ...font(12, 14.4, 'semibold', 'white'),
  },
  balanceContainer: {
    paddingHorizontal: INFO_ICON_SIZE - rem(2),
  },
  balanceValue: {
    marginTop: rem(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValueArrow: {
    paddingVertical: rem(6),
    paddingHorizontal: rem(7),
    borderRadius: rem(16),
    backgroundColor: COLORS.shamrock,
  },
  balanceValueArrowNegative: {
    backgroundColor: COLORS.attention,
  },
  balanceValueContainer: {
    marginLeft: rem(10),
    marginRight: rem(6),
  },
  balanceCurrencyText: {
    ...font(24, 28.8, 'semibold'),
  },
  miningRate: {
    marginTop: rem(10),
    borderRadius: rem(16),
    paddingHorizontal: rem(20),
    paddingVertical: rem(5),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateLabelText: {
    ...font(12, 14.4, 'semibold'),
  },
  rateValueContainer: {
    marginLeft: rem(8),
    marginRight: rem(4),
  },
  rateValueText: {
    ...font(17, 20.4, 'bold'),
  },
  infoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iceLabel: {
    alignItems: 'baseline',
  },
});
