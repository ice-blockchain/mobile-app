// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {PlusIcon} from '@svg/PlusIcon';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

const DEFAULT_EMOJIS = ['👍', '🔥', '😍', '👎'];

export function PostEmojiBar({postData}: Props) {
  const [emojis, setEmojis] = useState(postData.emojis);
  const onEmojiPressed = (emoji: string) => {
    setEmojis(emojisData => {
      const emojiData = emojisData[emoji];
      if (!emojiData) {
        return {
          ...emojisData,
          [emoji]: {
            counter: 1,
            liked: true,
          },
        };
      }
      const isLiked = !!emojiData.liked;
      return {
        ...emojisData,
        [emoji]: {
          counter: isLiked ? emojiData.counter - 1 : emojiData.counter + 1,
          liked: !isLiked,
        },
      };
    });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {DEFAULT_EMOJIS.map((emoji: string) => (
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
      <View key={'+'} style={[styles.emojiContainer, styles.plusContainer]}>
        <PlusIcon />
      </View>
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
