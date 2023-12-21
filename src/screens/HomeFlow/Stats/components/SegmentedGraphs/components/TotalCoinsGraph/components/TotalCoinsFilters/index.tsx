// SPDX-License-Identifier: ice License 1.0

import {TotalCoinsFilter} from '@api/statistics/types';
import {FilterButton} from '@components/Buttons/FilterButton';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type Props = {
  onSelect: (filter: TotalCoinsFilter) => void;
  selectedFilter: TotalCoinsFilter;
};

export type Filter = {
  type: TotalCoinsFilter;
  label: string;
};

export const FILTERS: Filter[] = [
  {type: 'total', label: t('stats.filter.total')},
  {type: 'on-app', label: t('stats.filter.on_app')},
  {type: 'pre-staked', label: t('stats.filter.pre_staked')},
  {type: 'on-blockchain', label: t('stats.filter.on_blockchain')},
];

export const TotalCoinsFilters = ({onSelect, selectedFilter}: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {FILTERS.map(filter => {
        return (
          <FilterButton
            key={filter.type}
            onPress={() => onSelect(filter.type)}
            label={filter.label}
            preset={'light'}
            selected={selectedFilter === filter.type}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 0,
    paddingHorizontal: rem(12),
    paddingTop: rem(18),
    paddingBottom: rem(6),
  },
});
