// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {DEFAULT_EMOJIS} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmojiBar/constants';
import {useEmojiBarHandlers} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmojiBar/hooks/useEmojiBarHandlers';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {
  ChannelPostData,
  PostEmojiData,
} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {PlusIcon} from '@svg/PlusIcon';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import * as React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
  updatePostData: (newPostData: ChannelPostData) => void;
};

function getDisplayEmojis(emojis: PostEmojiData) {
  return [...new Set([...DEFAULT_EMOJIS, ...Object.keys(emojis)])];
}

export function PostEmojiBar({postData, updatePostData}: Props) {
  const {emojis} = postData;
  const {onEmojiPressed, onShowEmojiSelector} = useEmojiBarHandlers({
    postData,
    updatePostData,
  });
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {getDisplayEmojis(emojis).map((emoji: string) => (
        <Pressable
          key={emoji}
          onPress={() => onEmojiPressed(emoji)}
          style={[
            styles.emojiContainer,
            emojis[emoji]?.liked ? styles.likedBackground : null,
          ]}>
          <Text style={styles.emoji}>{emoji}</Text>
          {emojis[emoji]?.counter ? (
            <Text
              style={[
                styles.emojiCounter,
                emojis[emoji]?.liked ? styles.likedTextColor : null,
              ]}>
              {formatNumber(emojis[emoji].counter, {
                notation: 'compact',
              })}
            </Text>
          ) : null}
        </Pressable>
      ))}
      <Pressable
        key={'+'}
        style={[styles.emojiContainer, styles.plusContainer]}
        onPress={onShowEmojiSelector}>
        <PlusIcon width={rem(24)} height={rem(25)} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: rem(14),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  emojiContainer: {
    marginRight: rem(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.feedBackground,
    borderRadius: rem(20),
    paddingVertical: rem(4),
    paddingHorizontal: rem(12),
  },
  emoji: {
    ...font(17, 21, 'medium'),
  },
  emojiCounter: {
    paddingLeft: rem(4),
    ...font(14, 17, 'medium', 'primaryDark'),
  },
  plusContainer: {
    backgroundColor: COLORS.secondaryFaint,
  },
  likedBackground: {
    backgroundColor: COLORS.primaryLight,
  },
  likedTextColor: {
    color: COLORS.white,
  },
});
