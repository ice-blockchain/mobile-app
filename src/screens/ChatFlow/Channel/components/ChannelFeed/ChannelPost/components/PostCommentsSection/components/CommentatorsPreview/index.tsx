// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function CommentatorsPreview({postData}: Props) {
  const remainingCommentators =
    postData.totalComments - postData.lastCommentatorsLogos.length;
  return (
    <View style={styles.container}>
      {postData.lastCommentatorsLogos.map((logo, index) => (
        <Image
          key={`${logo}:${index}`}
          style={styles.logo}
          source={{uri: logo}}
        />
      ))}
      {remainingCommentators ? (
        <View style={styles.remainingContainer}>
          <Text style={styles.text}>
            +{formatNumber(remainingCommentators, {notation: 'compact'})}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: rem(12),
  },
  logo: {
    width: rem(20),
    height: rem(20),
    borderRadius: rem(20),
    borderWidth: 1,
    borderColor: COLORS.white,
    marginRight: rem(-5),
  },
  remainingContainer: {
    height: rem(20),
    borderRadius: rem(20),
    paddingHorizontal: rem(5),
    borderWidth: 1,
    borderColor: COLORS.white,
    marginRight: rem(-5),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...font(9, 11, 'medium', 'white'),
  },
});
