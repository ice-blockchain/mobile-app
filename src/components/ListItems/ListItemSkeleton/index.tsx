// SPDX-License-Identifier: ice License 1.0

import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const ListItemSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={containerStyle}>
      <View style={styles.skeleton} />
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  skeleton: {
    height: rem(40),
    borderRadius: rem(9),
    marginTop: rem(16),
    alignSelf: 'stretch',
  },
});
