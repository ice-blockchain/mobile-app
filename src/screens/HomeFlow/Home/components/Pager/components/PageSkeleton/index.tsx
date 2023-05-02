// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export const PageSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={rem(16)} backgroundColor={COLORS.danube}>
      <>
        <View style={styles.titleRow} />
        <View style={styles.bodyRow} />
        <View style={styles.footerRow} />
      </>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    width: '35%',
    marginTop: rem(32),
    height: rem(14.4),
    alignSelf: 'center',
  },
  bodyRow: {
    width: '75%',
    marginTop: rem(8),
    height: rem(36),
    alignSelf: 'center',
  },
  footerRow: {
    width: '65%',
    marginTop: rem(8),
    height: rem(30),
    alignSelf: 'center',
  },
});
