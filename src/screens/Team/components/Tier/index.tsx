// SPDX-License-Identifier: BUSL-1.1

import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/EmptyTier';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export enum TierType {
  'tierOne',
  'tierTwo',
}

type TierProps = {
  type: TierType;
};

export function Tier({type}: TierProps): React.ReactElement {
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={{
        paddingBottom: tabbarOffest.current.paddingBottom,
      }}>
      <View style={styles.container}>
        <EmptyTier type={type} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
