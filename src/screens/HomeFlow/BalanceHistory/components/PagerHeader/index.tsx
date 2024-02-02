// SPDX-License-Identifier: ice License 1.0

import {PagerIndicators} from '@components/PagerIndicators';
import {COLORS} from '@constants/colors';
import {BlockchainCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/BlockchainCell';
import {DataCellSeparator} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/DataCell';
import {ExternalLink} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/ExternalLink';
import {WalletCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/WalletCell';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {BottomBump} from '@svg/BottomBump';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {PixelRatio, StyleSheet, Text, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

// PixelRatio.roundToNearestPixel here is to avoid a small gap between the container and the BottomBump component
export const PAGER_HEADER_HEIGHT = PixelRatio.roundToNearestPixel(rem(116));
export const PAGER_HEADER_BUMP_HEIGHT = rem(8);

export const PagerHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const balanceSummary = useSelector(balanceSummarySelector);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        initialPage={activeIndex}
        onPageSelected={onPageChange}
        style={styles.pager}>
        <View style={styles.slide}>
          <WalletCell
            value={balanceSummary && formatNumberString(balanceSummary.total)}
          />
          <DataCellSeparator />
          <BlockchainCell
            value={
              balanceSummary &&
              formatNumberString(balanceSummary.totalMiningBlockchain)
            }
          />
          <ExternalLink style={styles.slideLink} />
        </View>
        <View style={styles.slide}>
          <WalletCell
            value={
              <Text style={styles.updateText}>
                {t('balance_history.wallet_update_interval')}
              </Text>
            }
            currency={''}
          />
          <DataCellSeparator />
          <BlockchainCell
            value={
              <Text style={styles.updateText}>
                {t('balance_history.blockchain_update_interval')}
              </Text>
            }
            currency={''}
          />
        </View>
      </PagerView>
      <PagerIndicators activeIndex={activeIndex} style={styles.indicators} />
      <BottomBump
        style={styles.bottomBump}
        height={PAGER_HEADER_BUMP_HEIGHT}
        width={rem(62)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: rem(20),
    position: 'absolute',
    top: -PAGER_HEADER_HEIGHT / 2,
    left: rem(16),
    right: rem(16),
    height: PAGER_HEADER_HEIGHT,
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: rem(10),
    paddingTop: rem(14),
    flexDirection: 'row',
  },
  slideLink: {
    position: 'absolute',
    top: rem(14),
    right: rem(12),
  },
  updateText: {
    ...font(12, 17, 'medium', 'white', 'center'),
  },
  indicators: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  bottomBump: {
    position: 'absolute',
    top: PAGER_HEADER_HEIGHT,
    alignSelf: 'center',
  },
});
