// SPDX-License-Identifier: ice License 1.0

import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  replyPostData: ChannelPostData;
};

function getReplyPostTextHighlight(postData: ChannelPostData) {
  if (postData.postFile) {
    return postData.postFile.fileName;
  }
  if (postData.postCaption) {
    return postData.postCaption;
  }
  if (postData.postText) {
    return postData.postText;
  }
  if (postData.postEmoji) {
    return t('channel.emoji');
  }
  if (postData.postLink) {
    return postData.postLink.link;
  }
  if (postData.postImages?.length) {
    return `${postData.postImages?.length} ${t('channel.photo', {
      count: postData.postImages?.length,
    })}`;
  }
}

export function ReplyTextPreview({replyPostData}: Props) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.sourceName}>{`@${replyPostData.sourceName}`}</Text>
      <Text numberOfLines={1} style={styles.text}>
        {getReplyPostTextHighlight(replyPostData)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  sourceName: {
    ...font(14, 17, 'bold', 'primaryLight'),
  },
  text: {
    paddingTop: rem(2),
    ...font(14, 20, 'medium', 'primaryDark'),
  },
});
