// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ExploreFilterTile} from '@screens/ChatFlow/Explore/components/ExploreFilterTile';
import {ExploreFilterType} from '@screens/ChatFlow/Explore/types';
import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

type Props = {
  toggleFilter: (filterType: ExploreFilterType) => void;
  selectedFilterType: ExploreFilterType | null;
};

const filters: ExploreFilterType[] = ['all', 'channels', 'groups'];

export function ExploreFilter({toggleFilter, selectedFilterType}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {filters.map(filterType => (
        <ExploreFilterTile
          key={filterType}
          filterType={filterType}
          onPress={() => toggleFilter(filterType)}
          selected={selectedFilterType === filterType}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SCREEN_SIDE_OFFSET,
  },
});
