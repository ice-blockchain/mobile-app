// SPDX-License-Identifier: BUSL-1.1

import React, {memo} from 'react';
import {Image, ImageProps, PixelRatio} from 'react-native';

type Props = {
  uri: string;
  width: number;
  height: number;
} & Omit<ImageProps, 'source'>;

export const RemoteImage = memo(
  ({uri, width, height, ...imageProps}: Props) => {
    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
    const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(height);
    return (
      <Image
        source={{
          uri: `${uri}?width=${pixelWidth}&height=${pixelHeight}&quality=100`,
        }}
        {...imageProps}
      />
    );
  },
);
