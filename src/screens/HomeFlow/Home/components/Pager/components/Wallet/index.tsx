// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {PageSkeleton} from '@screens/HomeFlow/Home/components/Pager/components/PageSkeleton';
import {BalanceHistoryButton} from '@screens/HomeFlow/Home/components/Pager/components/Wallet/components/BalanceHistoryButton';
import {useBalanceHistoryWalkthrough} from '@screens/HomeFlow/Home/components/Pager/components/Wallet/hooks/useBalanceHistoryWalkthrough';
import {
  balanceSummarySelector,
  miningRatesSelector,
} from '@store/modules/Tokenomics/selectors';
import {ArrowDown} from '@svg/ArrowDown';
import {ArrowUp} from '@svg/ArrowUp';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {TotalBalanceValue} from './components/TotalBalanceValue';
import {TotalMiningRateValue} from './components/TotalMiningRateValue';

const INFO_ICON_SIZE = rem(16);

type Props = {
  darkMode?: boolean;
};

export const Wallet = memo(({darkMode}: Props) => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const miningRates = useSelector(miningRatesSelector);

  const {elementRef, onElementLayout} = useBalanceHistoryWalkthrough();

  if (!balanceSummary || !miningRates) {
    return <PageSkeleton />;
  }

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <Text
        style={[styles.balanceLabelText, darkMode && commonStyles.darkText]}>
        {t('home.wallet.balance')}
      </Text>
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

          <TotalBalanceValue
            darkMode={darkMode}
            style={styles.balanceValueContainer}
          />

          <IceLabel
            color={darkMode ? COLORS.primaryDark : COLORS.white}
            textStyle={[
              styles.balanceCurrencyText,
              darkMode ? styles.balanceCurrencyTextDarkMode : null,
            ]}
            iconOffsetY={3}
            iconSize={rem(20)}
          />
        </View>
        {isLightDesign ? null : (
          <View
            ref={elementRef}
            onLayout={onElementLayout}
            style={styles.infoButton}>
            <BalanceHistoryButton />
          </View>
        )}
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
    ...font(12, 16, 'semibold', 'white'),
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
  balanceValueDecimalsTextDarkMode: {
    alignSelf: 'flex-start',
    ...font(15, 20, 'semibold', 'primaryDark'),
  },
  balanceCurrencyText: {
    ...font(24, 29, 'semibold'),
    marginLeft: isRTL ? rem(8) : 0,
  },
  balanceCurrencyTextDarkMode: {
    color: COLORS.primaryDark,
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
    ...font(12, 16, 'semibold'),
  },
  rateValueContainer: {
    marginLeft: rem(8),
    marginRight: rem(4),
  },
  rateValueText: {
    ...font(17, 22, 'bold'),
    marginLeft: isRTL ? rem(6) : 0,
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
