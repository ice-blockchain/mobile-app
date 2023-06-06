// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChannelFeed} from '@screens/ChatFlow/Channel/components/ChannelFeed';
import {
  CHANNEL_HEADER_HEIGHT,
  ChannelHeader,
} from '@screens/ChatFlow/Channel/components/ChannelHeader';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export function Channel() {
  const topOffset = useTopOffsetStyle();
  const tabBarOffset = useBottomTabBarOffsetStyle();
  const route = useRoute<RouteProp<MainStackParamList, 'Channel'>>();
  const {channelData} = route.params;

  return (
    <View style={[styles.container, topOffset.current, tabBarOffset.current]}>
      <View style={[commonStyles.shadow, styles.headerContainer]}>
        <ChannelHeader channelData={channelData} />
      </View>
      <View style={styles.feedContainer}>
        <ChannelFeed channelData={channelData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.feedBackground,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    position: 'absolute',
  },
  feedContainer: {
    paddingTop: CHANNEL_HEADER_HEIGHT + 1,
  },
});
