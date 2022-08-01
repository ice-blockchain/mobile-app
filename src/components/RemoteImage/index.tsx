// SPDX-License-Identifier: BUSL-1.1

import React, {memo} from 'react';
import {Image, ImageProps, PixelRatio} from 'react-native';

type Props = {
  uri: string;
  width?: number;
  height?: number;
} & Omit<ImageProps, 'source'>;

export const RemoteImage = memo(
  ({uri, width, height, ...imageProps}: Props) => {
    const queryWidth = width
      ? `&width=${PixelRatio.getPixelSizeForLayoutSize(width)}`
      : '';
    const queryHeight = height
      ? `&height=${PixelRatio.getPixelSizeForLayoutSize(height)}`
      : '';
    return (
      <Image
        source={{
          uri: `${uri}?quality=100${queryHeight}${queryWidth}`,
        }}
        {...imageProps}
      />
    );
  },
);
