// SPDX-License-Identifier: ice License 1.0

import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostEmoji({postData}: Props) {
  if (!postData.postEmoji) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{postData.postEmoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  text: {
    ...font(60, 80, 'medium'),
  },
});
