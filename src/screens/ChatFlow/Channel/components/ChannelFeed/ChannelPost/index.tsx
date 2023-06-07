// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
  getPostData: (postId: number) => ChannelPostData | null;
  updatePostData: (newPostData: ChannelPostData) => void;
  deletePostData: (postId: number) => void;
  onEmojiBarLayout?: (event: LayoutChangeEvent) => void;
  darkMode?: boolean;
};

export function ChannelPost({
  postData,
  getPostData,
  updatePostData,
  deletePostData,
  onEmojiBarLayout,
  darkMode,
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const onLongPress = () => {
    navigation.navigate('ChannelPostHighlight', {
      postData,
      getPostData,
      updatePostData,
      deletePostData,
    });
  };
  return (
    <Touchable
      key={postData.id}
      style={[styles.container, darkMode ? styles.darkModeBackground : null]}
      onLongPress={onLongPress}>
      <PostImagesSection postData={postData} />
      <PostInfoSection postData={postData} />
      <PostReplySection postData={postData} getPostData={getPostData} />
      <PostCaption postData={postData} />
      <PostLink postData={postData} />
      <PostEmoji postData={postData} />
      <PostText postData={postData} />
      <PostFile postData={postData} />
      <View onLayout={onEmojiBarLayout}>
        <PostEmojiBar postData={postData} updatePostData={updatePostData} />
      </View>
      <PostCommentsSection postData={postData} />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    width: '100%',
    overflow: 'hidden',
  },
  darkModeBackground: {
    backgroundColor: COLORS.morningSkyBlue,
  },
});
