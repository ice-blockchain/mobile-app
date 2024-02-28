// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {StatListItem} from '@navigation/components/IceCoinStats/components/Stats/components/StatListItem';
import {AlignIcon} from '@svg/new/Align';
import {DiamondIcon} from '@svg/new/Diamond';
import {GraphIcon} from '@svg/new/Graph';
import {PieIcon} from '@svg/new/Pie';
import {RefreshIcon} from '@svg/new/Refresh';
import {StructureIcon} from '@svg/new/Structure';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

export const Stats = memo(() => {
  return (
    <>
      <SectionHeader title={'Ice Stats'} />
      <View style={styles.list}>
        <StatListItem
          Icon={<RefreshIcon />}
          label={'Circulating Supply'}
          value={`${formatNumber(1060855721)} ${t(
            'general.ice',
          ).toUpperCase()}`}
        />
        <StatListItem
          Icon={<PieIcon />}
          label={'Total Supply'}
          value={`${formatNumber(30060855721)} ${t(
            'general.ice',
          ).toUpperCase()}`}
        />
        <StatListItem
          Icon={<GraphIcon />}
          label={'Price'}
          value={`$${0.12312312}`}
        />
        <StatListItem
          Icon={<DiamondIcon />}
          label={'Market Cap'}
          value={`$${formatNumber(13081729)}`}
        />
        <StatListItem
          Icon={<AlignIcon />}
          label={'24h Trading Volume'}
          value={`$${formatNumber(13081729)}`}
        />
        <StatListItem
          Icon={<StructureIcon />}
          label={'Fully dilluted market cap'}
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
