// SPDX-License-Identifier: ice License 1.0

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ChannelPostData,
  PostEmojiData,
} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';

type Props = {
  postData: ChannelPostData;
  updatePostData: (newPostData: ChannelPostData) => void;
};

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

export function useEmojiBarHandlers({postData, updatePostData}: Props) {
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

  return {onEmojiPressed, onShowEmojiSelector};
}
