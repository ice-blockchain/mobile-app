// SPDX-License-Identifier: BUSL-1.1

import {Contacts} from '@screens/Team/components/Contacts';
import {Tier, TierType} from '@screens/Team/components/Tier';
import {TierOneList} from '@screens/Team/components/TierOneList';
import {TABS, TiersSwitcher} from '@screens/Team/components/TiersSwitcher';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Tiers = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTab = TABS[selectedIndex];
  return (
    <View style={styles.container}>
      <TiersSwitcher onChange={setSelectedIndex} style={styles.tabbar} />
      <View style={styles.container}>
        {selectedTab.key === 'Contacts' && <Contacts />}
        {selectedTab.key === 'TierOne' && <TierOneList />}
        {selectedTab.key === 'TierTwo' && <Tier type={TierType.tierTwo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    marginTop: 24,
    marginHorizontal: 24,
  },
});
