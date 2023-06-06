// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {DEFAULT_EMOJIS} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmojiBar/constants';
import {useEmojiBarHandlers} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostEmojiBar/hooks/useEmojiBarHandlers';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {PlusIcon} from '@svg/PlusIcon';
import {font} from '@utils/styles';
import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {BounceIn} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
  updatePostData: (newPostData: ChannelPostData) => void;
};

export function ContextEmojiBar({postData, updatePostData}: Props) {
  const [pressedEmoji, setPressedEmoji] = useState<string | undefined>();
  const {onEmojiPressed, onShowEmojiSelector} = useEmojiBarHandlers({
    postData,
    updatePostData,
  });
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {DEFAULT_EMOJIS.map((emoji: string, index: number) => (
        <Animated.View key={emoji} entering={BounceIn.delay(100 * (index + 1))}>
          <Pressable
            onPress={() => {
              setPressedEmoji(emoji);
              onEmojiPressed(emoji);
            }}
            style={[
              styles.emojiContainer,
              pressedEmoji === emoji ? styles.likedBackground : null,
            ]}>
            <Text
              style={[
                styles.emoji,
                pressedEmoji === emoji ? styles.likedTextColor : null,
              ]}>
              {emoji}
            </Text>
          </Pressable>
        </Animated.View>
      ))}
      <Pressable
        key={'+'}
        style={[styles.emojiContainer, styles.plusContainer]}
        onPress={onShowEmojiSelector}>
        <PlusIcon
          width={rem(24)}
          height={rem(25)}
          color={COLORS.primaryLight}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    overflow: 'hidden',
    width: windowWidth - SCREEN_SIDE_OFFSET * 2,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    flexGrow: 1,
  },
  emojiContainer: {
    marginRight: rem(14),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.feedBackground,
    borderRadius: rem(20),
    paddingVertical: rem(6),
    paddingHorizontal: rem(12),
  },
  emoji: {
    ...font(17, 21, 'medium'),
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
