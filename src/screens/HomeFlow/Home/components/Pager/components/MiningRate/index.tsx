// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {FORCE_LTR_TEXT_CHAR} from '@constants/rtl';
import {commonStyles, MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {PAGE_HEIGHT} from '@screens/HomeFlow/Home/components/Pager';
import {PageSkeleton} from '@screens/HomeFlow/Home/components/Pager/components/PageSkeleton';
import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {MiningHammerIcon} from '@svg/MiningHammerIcon';
import {StarIcon} from '@svg/StarIcon';
import {TeamIcon} from '@svg/TeamIcon';
import {isRTL, t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {formatNumber, parseNumber, removeZeroDigits} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {MiningRateValue} from './components/MiningRateValue';

const INFO_ICON_SIZE = rem(16);

type Props = {
  darkMode?: boolean;
};

export const MiningRate = memo(({darkMode}: Props) => {
  const miningRates = useSelector(miningRatesSelector);

  const rateValueTextStyle = useMemo(() => {
    switch (miningRates?.type) {
      case 'positive':
        return styles.miningValuePositive;

      case 'negative':
        return styles.miningValueNegative;

      default:
        return styles.miningValueNeutral;
    }
  }, [miningRates?.type]);

  const openBonusesInfo = () => {
    openLinkWithInAppBrowser({
      url: LINKS.BONUSES,
    });
  };

  if (!miningRates) {
    return <PageSkeleton />;
  }

  const color = darkMode ? COLORS.primaryDark : COLORS.white;
  const totalBonuses =
    (miningRates?.total.bonuses?.t1 ?? 0) +
    (miningRates?.total.bonuses?.t2 ?? 0);
  const extraBonuses = miningRates?.total.bonuses?.extra ?? 0;
  const prestackingBonuses = miningRates?.total.bonuses?.preStaking ?? 0;

  return (
    <View style={[commonStyles.baseSubScreen, styles.container]}>
      <View style={styles.titleContainer}>
        <MiningHammerIcon color={color} />
        <Text
          style={[styles.miningRateText, darkMode && commonStyles.darkText]}>
          {t('home.mining_rate.title')}
        </Text>
      </View>
      <View style={styles.miningRate}>
        <MiningRateValue
          style={styles.miningValueContainer}
          bodyStyle={[styles.miningValueText, rateValueTextStyle]}
          decimalsStyle={[styles.miningValueDecimalsText, rateValueTextStyle]}
          signRequired
          value={
            parseNumber(miningRates?.total.amount ?? '0') *
            {
              positive: 1,
              negative: -1,
              none: 1,
            }[miningRates?.type ?? 'none']
          }
        />

        <IceLabel
          textStyle={styles.rateValueText}
          iconOffsetY={0}
          iconSize={16}
          label={t('general.ice_per_hour')}
        />
        {!!miningRates.total.bonuses?.total && (
          <Text style={styles.rateIncreaseText}>
            {FORCE_LTR_TEXT_CHAR}+
            {removeZeroDigits(
              formatNumber(miningRates.total.bonuses.total, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            )}
            %
          </Text>
        )}

        <Touchable
          style={styles.miningRateInfo}
          onPress={openBonusesInfo}
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          <InfoOutlineIcon
            width={INFO_ICON_SIZE}
            height={INFO_ICON_SIZE}
            color={COLORS.shamrock}
          />
        </Touchable>
      </View>
      <View style={styles.baseContainer}>
        <Text style={[styles.baseTitleText, darkMode && commonStyles.darkText]}>
          {t('home.mining_rate.base')}
        </Text>
        <MiningRateValue
          style={styles.baseValueContainer}
          bodyStyle={
            darkMode ? styles.baseValueTextDarkMode : styles.baseValueText
          }
          decimalsStyle={
            darkMode ? styles.baseDecimalsTextDarkMode : styles.baseDecimalsText
          }
          value={parseNumber(miningRates?.base.amount ?? '0')}
        />

        <IceLabel
          textStyle={
            darkMode ? styles.baseValueTextDarkMode : styles.baseValueText
          }
          color={color}
          iconOffsetY={0}
          iconSize={12}
          label={t('general.ice_per_hour')}
        />
      </View>
      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <TeamIcon color={color} />
          <AnimatedNumberText
            value={totalBonuses}
            style={styles.iconValueText}
            textDecorator={value =>
              `${FORCE_LTR_TEXT_CHAR}${formatNumber(value)}%`
            }
          />
        </View>
        <View style={styles.iconContainer}>
          <StarIcon color={color} />
          <AnimatedNumberText
            value={extraBonuses}
            style={styles.iconValueText}
            textDecorator={value =>
              `${FORCE_LTR_TEXT_CHAR}${formatNumber(value)}%`
            }
          />
        </View>
        <View style={styles.iconContainer}>
          <CoinsStackIcon color={color} width={rem(14)} height={rem(14)} />
          <AnimatedNumberText
            value={prestackingBonuses}
            style={styles.iconValueText}
            textDecorator={value =>
              `${FORCE_LTR_TEXT_CHAR}+${removeZeroDigits(
                formatNumber(value, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              )}%`
            }
          />
        </View>
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
  titleContainer: {
    marginTop: rem(25),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  miningRateText: {
    ...font(12, 15, 'semibold'),
    marginLeft: rem(4),
  },
  miningValueContainer: {
    marginRight: isRTL ? 0 : rem(4),
    marginLeft: isRTL ? rem(4) : 0,
  },
  miningValueText: {
    ...font(17, 22, 'bold'),
  },
  miningValueDecimalsText: {
    alignSelf: 'flex-start',
    ...font(8, 11, 'bold'),
    marginRight: isRTL ? 0 : rem(4),
  },
  miningValuePositive: {
    color: COLORS.shamrock,
  },
  miningValueNegative: {
    color: COLORS.attention,
  },
  miningValueNeutral: {
    color: COLORS.white,
  },
  baseContainer: {
    marginTop: rem(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseTitleText: {
    ...font(12, 16, 'medium'),
  },
  baseValueContainer: {
    marginHorizontal: rem(4),
  },
  baseValueText: {
    ...font(12, 16, 'medium'),
  },
  baseValueTextDarkMode: {
    ...font(12, 16, 'medium', 'primaryDark'),
  },
  baseDecimalsText: {
    ...font(7, 10, 'bold'),
    alignSelf: 'flex-start',
    marginRight: isRTL ? 0 : rem(4),
    marginLeft: isRTL ? rem(4) : 0,
  },
  baseDecimalsTextDarkMode: {
    ...font(7, 10, 'bold', 'primaryDark'),
    alignSelf: 'flex-start',
    marginRight: rem(4),
  },
  miningRate: {
    marginTop: rem(4),
    borderRadius: rem(16),
    paddingHorizontal: rem(20),
    paddingVertical: rem(6),
    backgroundColor: COLORS.toreaBay,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miningRateInfo: {
    position: 'absolute',
    top: -(INFO_ICON_SIZE / 2),
    right: -INFO_ICON_SIZE,
  },
  rateValueText: {
    ...font(15, 20, 'medium'),
  },
  rateIncreaseText: {
    marginLeft: rem(8),
    ...font(17, 22, 'bold'),
    color: COLORS.shamrock,
  },
  iconsContainer: {
    marginTop: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginHorizontal: rem(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconValueText: {
    marginLeft: rem(6),
    ...font(15, undefined, 'bold'),
    color: COLORS.shamrock,
  },
});
