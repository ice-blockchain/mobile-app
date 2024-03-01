// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {StatListItem} from '@screens/MainnetLanding/components/Stats/components/StatListItem';
import {iceCoinStatsSelector} from '@store/modules/Stats/selectors';
import {AlignIcon} from '@svg/Align';
import {DiamondIcon} from '@svg/Diamond';
import {GraphIcon} from '@svg/Graph';
import {PieIcon} from '@svg/Pie';
import {RefreshIcon} from '@svg/Refresh';
import {StructureIcon} from '@svg/Structure';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

export const Stats = memo(() => {
  const iceCoinStats = useSelector(iceCoinStatsSelector);

  if (!iceCoinStats) {
    return null;
  }

  return (
    <>
      <SectionHeader title={t('mainnet_landing.stats.header')} />
      <View style={styles.list}>
        {!!iceCoinStats.circulatingSupply && (
          <StatListItem
            Icon={<RefreshIcon />}
            label={t('mainnet_landing.stats.circulating_supply')}
            value={`${formatNumber(iceCoinStats.circulatingSupply)} ${t(
              'general.ice',
            ).toUpperCase()}`}
          />
        )}
        {!!iceCoinStats.totalSupply && (
          <StatListItem
            Icon={<PieIcon />}
            label={t('mainnet_landing.stats.total_supply')}
            value={`${formatNumber(iceCoinStats.totalSupply)} ${t(
              'general.ice',
            ).toUpperCase()}`}
          />
        )}
        {!!iceCoinStats.price && (
          <StatListItem
            Icon={<GraphIcon />}
            label={t('mainnet_landing.stats.price')}
            value={`$${formatNumber(iceCoinStats.price, {
              maximumFractionDigits: 5,
            })}`}
          />
        )}
        {!!iceCoinStats.marketCap && (
          <StatListItem
            Icon={<DiamondIcon />}
            label={t('mainnet_landing.stats.market_cap')}
            value={`$${formatNumber(iceCoinStats.marketCap)}`}
          />
        )}
        {!!iceCoinStats['24hTradingVolume'] && (
          <StatListItem
            Icon={<AlignIcon />}
            label={t('mainnet_landing.stats.daily_trading_volume')}
            value={`$${formatNumber(iceCoinStats['24hTradingVolume'])}`}
          />
        )}
        {!!iceCoinStats.fullyDilutedMarketCap && (
          <StatListItem
            Icon={<StructureIcon />}
            label={t('mainnet_landing.stats.dilluted_market_cap')}
            value={`$${formatNumber(iceCoinStats.fullyDilutedMarketCap)}`}
          />
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
