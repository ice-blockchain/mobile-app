// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ReplyImagePreview} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostReplySection/components/ReplyImagePreview';
import {ReplyTextPreview} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostReplySection/components/ReplyTextPreview';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ReplyIcon} from '@svg/ReplyIcon';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
  getPostData: (postId: number) => ChannelPostData | null;
};

const REPLY_ICON_SIZE = rem(12);

export function PostReplySection({postData, getPostData}: Props) {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  if (!postData.replyToPost) {
    return null;
  }
  const replyPostData = getPostData(postData.replyToPost);
  if (!replyPostData) {
    return null;
  }
  return (
    <View style={styles.outerContainer}>
      <View
        style={styles.container}
        onLayout={({nativeEvent}) =>
          setContainerHeight(nativeEvent.layout.height)
        }>
        <View style={styles.row}>
          <ReplyImagePreview replyPostData={replyPostData} />
          <ReplyTextPreview replyPostData={replyPostData} />
        </View>
        <View
          style={[
            styles.replyIconContainer,
            {top: containerHeight / 2 - REPLY_ICON_SIZE / 2},
          ]}>
          <ReplyIcon width={REPLY_ICON_SIZE} height={REPLY_ICON_SIZE} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingTop: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  container: {
    backgroundColor: COLORS.feedBackground,
    borderRadius: 10,
    paddingVertical: rem(4),
    paddingHorizontal: rem(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIconContainer: {
    position: 'absolute',
    top: 0,
    left: -REPLY_ICON_SIZE / 2,
  },
});
