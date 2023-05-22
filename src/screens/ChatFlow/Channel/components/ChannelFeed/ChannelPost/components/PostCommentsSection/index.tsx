// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CommentatorsPreview} from '@screens/ChatFlow/Channel/components/ChannelFeed/ChannelPost/components/PostCommentsSection/components/CommentatorsPreview';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ChevronIcon} from '@svg/ChevronIcon';
import {CommentIcon} from '@svg/CommentIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostCommentsSection({postData}: Props) {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.container}>
        <CommentatorsPreview postData={postData} />
        <CommentIcon />
        <Text style={styles.text}>{t('channel.comments')}</Text>
        {postData.totalComments ? (
          <Text style={styles.text}>({postData.totalComments})</Text>
        ) : null}
        <View style={styles.separator} />
        <ChevronIcon
          color={COLORS.primaryLight}
          height={rem(12)}
          strokeWidth={1.4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.secondaryFaint,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rem(16),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  text: {
    paddingLeft: rem(6),
    ...font(14, 17, 'medium', 'primaryLight'),
  },
  separator: {
    flex: 1,
  },
});
