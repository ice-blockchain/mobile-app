// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {font} from '@utils/styles';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostLink({postData: {postLink}}: Props) {
  if (!postLink) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.sourceContainer}>
          <Image
            style={styles.sourceLogo}
            source={{uri: postLink.sourceLogo}}
          />
          <Text style={styles.linkText}>{postLink.link}</Text>
        </View>
        <Text style={styles.sourceText}>{postLink.source}</Text>
        <Text style={styles.titleText}>{postLink.title}</Text>
        <Text style={styles.descriptionText}>{postLink.shortDescription}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(12),
    paddingHorizontal: rem(12),
  },
  borderContainer: {
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primaryLight,
    paddingLeft: rem(8),
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    paddingLeft: rem(6),
    textDecorationLine: 'underline',
    ...font(14, 14, 'medium', 'primaryLight'),
  },
  sourceText: {
    paddingTop: rem(8),
    ...font(14, 19, 'medium', 'primaryDark'),
  },
  sourceLogo: {
    width: rem(12),
    height: rem(12),
    borderWidth: 1,
  },
  titleText: {
    paddingTop: rem(4),
    ...font(14, 19, 'medium', 'primaryLight'),
  },
  descriptionText: {
    paddingTop: rem(4),
    ...font(14, 19, 'medium', 'primaryDark'),
  },
});
