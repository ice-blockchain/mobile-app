// SPDX-License-Identifier: BUSL-1.1

import {Tab} from '@components/TabBar';
import {Contacts} from '@screens/Team/components/Contacts';
import {Tier, TierType} from '@screens/Team/components/Tier';
import {Tabs, TiersSwitcher} from '@screens/Team/components/TiersSwitcher';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export const Tiers = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tabs.contacts);
  return (
    <View style={styles.container}>
      <TiersSwitcher
        onPress={tab => {
          if (tab) {
            setSelectedTab(tab);
          }
        }}
      />
      <View style={styles.container}>
        {selectedTab === Tabs.contacts && <Contacts />}
        {selectedTab === Tabs.tierOne && <Tier type={TierType.tierOne} />}
        {selectedTab === Tabs.tierTwo && <Tier type={TierType.tierTwo} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
