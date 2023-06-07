// SPDX-License-Identifier: ice License 1.0

import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {ViewIcon} from '@svg/ViewIcon';
import {t} from '@translations/i18n';
import {formatTimestamp} from '@utils/date';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostInfoSection({postData}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sourceName}>{`@${postData.sourceName}`}</Text>
      <View style={styles.rightContainer}>
        <ViewIcon />
        <Text style={[styles.text, styles.paddingLeftSmall]}>
          {formatNumber(postData.views, {notation: 'compact'})}
        </Text>
        {postData.edited ? (
          <Text style={[styles.text, styles.paddingLeft]}>
            {t('channel.edited')}
          </Text>
        ) : null}
        <Text
          style={[
            styles.text,
            postData.edited ? styles.paddingLeftSmall : styles.paddingLeft,
          ]}>
          {formatTimestamp({
            timestamp: postData.postTimestamp,
            format: 'HH:mm',
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceName: {
    ...font(14, 17, 'bold', 'primaryLight'),
  },
  text: {
    ...font(12, 15, 'medium', 'secondary'),
  },
  paddingLeftSmall: {
    paddingLeft: rem(4),
  },
  paddingLeft: {
    paddingLeft: rem(8),
  },
});
