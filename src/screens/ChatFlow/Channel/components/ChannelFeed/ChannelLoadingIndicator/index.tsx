// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {rem} from 'rn-units';

export function ChannelLoadingIndicator() {
  return (
    <ScrollView>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <SkeletonPlaceholder key={index}>
            <View style={styles.container} />
          </SkeletonPlaceholder>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    height: rem(264),
    width: '100%',
    marginBottom: CHANNEL_POST_SIDE_OFFSET,
  },
});
