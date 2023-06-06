// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import * as React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

const IMAGE_WIDTH = windowWidth - SCREEN_SIDE_OFFSET * 2;
// 1.673170731707317 is an aspect ratio from the designs
const IMAGE_HEIGHT = IMAGE_WIDTH / 1.673170731707317;

const SEPARATOR_WIDTH = rem(4);
const SMALL_IMAGE_WIDTH =
  (windowWidth - SCREEN_SIDE_OFFSET * 2 - SEPARATOR_WIDTH) / 2;
// 1.1643835616438356 is an aspect ratio from the designs
const SMALL_IMAGE_HEIGHT = SMALL_IMAGE_WIDTH / 1.1643835616438356;

export function PostImagesSection({postData}: Props) {
  if (!postData.postImages?.length) {
    return null;
  }
  if (postData.postImages.length === 1) {
    return (
      <Image style={styles.container} source={{uri: postData.postImages[0]}} />
    );
  }
  const isEven = postData.postImages.length % 2 === 0;
  const data = isEven
    ? postData.postImages
    : postData.postImages.slice(0, postData.postImages.length - 1);
  const renderItem = ({item, index}: {item: string; index: number}) => {
    const isEvenIndex = index % 2 === 0;
    return (
      <View style={[styles.wrapper, isEvenIndex && styles.columnSeparator]}>
        <Image key={item} style={styles.smallContainer} source={{uri: item}} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      ListFooterComponent={
        !isEven ? (
          <Image
            style={styles.wideContainer}
            source={{uri: postData.postImages[postData.postImages.length - 1]}}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  wrapper: {
    paddingBottom: SEPARATOR_WIDTH,
  },
  columnSeparator: {
    paddingRight: rem(4),
  },
  smallContainer: {
    width: SMALL_IMAGE_WIDTH,
    height: SMALL_IMAGE_HEIGHT,
  },
  wideContainer: {
    width: IMAGE_WIDTH,
    height: SMALL_IMAGE_HEIGHT,
  },
});
