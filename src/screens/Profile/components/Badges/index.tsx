// SPDX-License-Identifier: BUSL-1.1

import {BadgeList} from '@screens/Profile/components/Badges/components/BadgeList';
import {SectionHeader} from '@screens/Profile/components/SectionHeader';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Badges = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <View style={styles.container}>
      <SectionHeader title={'MY BADGES'} onViewAllPress={() => {}} />
      <BadgeList loading={loading} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(28),
  },
});
