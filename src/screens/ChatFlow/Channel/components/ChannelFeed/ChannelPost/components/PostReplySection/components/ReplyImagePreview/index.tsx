// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {FileIcon} from '@svg/FileIcon';
import {font} from '@utils/styles';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  replyPostData: ChannelPostData;
};

export function ReplyImagePreview({replyPostData}: Props) {
  if (replyPostData.postFile) {
    return (
      <View style={styles.container}>
        <FileIcon />
      </View>
    );
  }
  if (replyPostData.postEmoji) {
    return (
      <View style={[styles.container, styles.whiteBackground]}>
        <Text style={styles.emoji}>{replyPostData.postEmoji}</Text>
      </View>
    );
  }
  if (replyPostData.postImages?.length) {
    return (
      <Image
        style={styles.container}
        source={{uri: replyPostData.postImages[0]}}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    width: rem(30),
    height: rem(30),
    marginRight: rem(8),
    backgroundColor: COLORS.secondaryFaint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    backgroundColor: COLORS.white,
  },
  emoji: {
    ...font(17, 21, 'medium'),
  },
});
