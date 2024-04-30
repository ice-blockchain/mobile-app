// SPDX-License-Identifier: ice License 1.0

import {HistoryListItemSkeleton} from '@screens/HomeFlow/BalanceHistory/components/HistoryList/components/HistoryListItem';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const HistoryListLoader = () => {
  return (
    <View style={styles.container}>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <HistoryListItemSkeleton key={index} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(8),
  },
});
