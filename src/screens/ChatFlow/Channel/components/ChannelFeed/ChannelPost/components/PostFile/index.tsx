// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {FileIcon} from '@svg/FileIcon';
import {convertFileSize} from '@utils/numbers';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostFile({postData: {postFile}}: Props) {
  if (!postFile) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FileIcon />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{postFile.fileName}</Text>
        <Text style={styles.size}>{convertFileSize(postFile.fileSize)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: rem(40),
    height: rem(40),
    borderRadius: rem(10),
    backgroundColor: COLORS.secondaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    paddingLeft: rem(12),
    justifyContent: 'center',
  },
  name: {
    ...font(14, 18, 'medium', 'primaryDark'),
  },
  size: {
    ...font(12, 18, 'semibold', 'secondary'),
  },
});
