// SPDX-License-Identifier: BUSL-1.1

import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/EmptyTier';
import React from 'react';
import {StyleSheet, View} from 'react-native';

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
    <View style={[styles.container, tabbarOffest.current]}>
      <EmptyTier type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
