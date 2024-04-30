// SPDX-License-Identifier: ice License 1.0

import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

const NUMBER_OF_SKELETONS = 6;

export const TasksSkeleton = () => (
  <>
    {Array(NUMBER_OF_SKELETONS)
      .fill(null)
      .map((_, index) => (
        <SkeletonPlaceholder borderRadius={rem(16)} key={index}>
          <View style={styles.skeleton} />
        </SkeletonPlaceholder>
      ))}
  </>
);

const styles = StyleSheet.create({
  skeleton: {
    height: rem(54),
    marginVertical: rem(6),
    marginHorizontal: rem(16),
  },
});
