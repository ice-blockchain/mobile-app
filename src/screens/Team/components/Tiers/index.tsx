// SPDX-License-Identifier: BUSL-1.1

import {Contacts} from '@screens/Team/components/Contacts';
import {Tier, TierType} from '@screens/Team/components/Tier';
import {TABS, TiersSwitcher} from '@screens/Team/components/TiersSwitcher';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Tiers = () => {
  const [selectedTab, setSelectedTab] = useState<typeof TABS[number]>(TABS[0]);
  return (
    <View style={styles.container}>
      <TiersSwitcher onPress={setSelectedTab} style={styles.tabbar} />
      <View style={styles.container}>
        {selectedTab.key === 'Contacts' && <Contacts />}
        {selectedTab.key === 'TierOne' && <Tier type={TierType.tierOne} />}
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
