// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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

const DEFAULT_EMOJIS = ['👍', '🔥', '😍', '👎'];

function getUpdatedEmojis({
  emojiToSwitch,
  emojis,
}: {
  emojiToSwitch: string;
  emojis: PostEmojiData;
}): PostEmojiData {
  const emojiData = emojis[emojiToSwitch];
  if (!emojiData) {
    return {
      ...emojis,
      [emojiToSwitch]: {
        counter: 1,
        liked: true,
      },
    };
  }
  const isLiked = !!emojiData.liked;
  return {
    ...emojis,
    [emojiToSwitch]: {
      counter: isLiked ? emojiData.counter - 1 : emojiData.counter + 1,
      liked: !isLiked,
    },
  };
}

function getDisplayEmojis(emojis: PostEmojiData) {
  return [...new Set([...DEFAULT_EMOJIS, ...Object.keys(emojis)])];
}

export function PostEmojiBar({postData, updatePostData}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {emojis} = postData;
  const onEmojiPressed = (emoji: string) => {
    const newEmojis = getUpdatedEmojis({
      emojiToSwitch: emoji,
      emojis,
    });
    updatePostData({
      ...postData,
      emojis: newEmojis,
    });
  };
  const onShowEmojiSelector = () =>
    navigation.navigate('EmojiSelector', {
      onSelected: onEmojiPressed,
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
        <PlusIcon />
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
    borderRadius: 20,
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
