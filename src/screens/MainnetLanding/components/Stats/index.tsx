// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {StatListItem} from '@screens/MainnetLanding/components/Stats/components/StatListItem';
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

export const Stats = memo(() => {
  return (
    <>
      <SectionHeader title={t('mainnet_landing.stats.header')} />
      <View style={styles.list}>
        <StatListItem
          Icon={<RefreshIcon />}
          label={t('mainnet_landing.stats.circulating_supply')}
          value={`${formatNumber(1060855721)} ${t(
            'general.ice',
          ).toUpperCase()}`}
        />
        <StatListItem
          Icon={<PieIcon />}
          label={t('mainnet_landing.stats.total_supply')}
          value={`${formatNumber(30060855721)} ${t(
            'general.ice',
          ).toUpperCase()}`}
        />
        <StatListItem
          Icon={<GraphIcon />}
          label={t('mainnet_landing.stats.price')}
          value={`$${0.12312312}`}
        />
        <StatListItem
          Icon={<DiamondIcon />}
          label={t('mainnet_landing.stats.market_cap')}
          value={`$${formatNumber(13081729)}`}
        />
        <StatListItem
          Icon={<AlignIcon />}
          label={t('mainnet_landing.stats.daily_trading_volume')}
          value={`$${formatNumber(13081729)}`}
        />
        <StatListItem
          Icon={<StructureIcon />}
          label={t('mainnet_landing.stats.dilluted_market_cap')}
          value={`$${formatNumber(13081729)}`}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
