// SPDX-License-Identifier: BUSL-1.1

import {defaultSubScreenTopOffset} from '@constants/styles';
import {InfoItem, InfoItemType} from '@screens/Team/components/InfoItem';
import Search from '@screens/Team/components/Search';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Header = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Search value={query} onChangeText={setQuery} />
      <View style={styles.infoItems}>
        <InfoItem type={InfoItemType.referrals} />
        <InfoItem type={InfoItemType.earnings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: defaultSubScreenTopOffset,
  },
  infoItems: {
    flexDirection: 'row',
    flex: 1,
  },
});
