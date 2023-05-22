// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {PostCaption} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostCaption';
import {PostCommentsSection} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostCommentsSection';
import {PostEmoji} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmoji';
import {PostEmojiBar} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmojiBar';
import {PostFile} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostFile';
import {PostImagesSection} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostImagesSection';
import {PostInfoSection} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostInfoSection';
import {PostLink} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostLink';
import {PostReplySection} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostReplySection';
import {PostText} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostText';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  postData: ChannelPostData;
  getPostData: (postId: number) => ChannelPostData | null;
};

export function ChannelPost({postData, getPostData}: Props) {
  return (
    <View key={postData.id} style={styles.container}>
      <PostImagesSection postData={postData} />
      <PostInfoSection postData={postData} />
      <PostReplySection postData={postData} getPostData={getPostData} />
      <PostCaption postData={postData} />
      <PostLink postData={postData} />
      <PostEmoji postData={postData} />
      <PostText postData={postData} />
      <PostFile postData={postData} />
      <PostEmojiBar postData={postData} />
      <PostCommentsSection postData={postData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    width: '100%',
    overflow: 'hidden',
  },
});
