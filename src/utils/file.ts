// SPDX-License-Identifier: ice License 1.0

import {PixelRatio, Platform} from 'react-native';

export const getFilenameFromPath = (path: string) => {
  // eslint-disable-next-line no-useless-escape
  return path.replace(/^.*[\\\/]/, '');
};

export const getFilenameFromPathWithoutExtension = (path: string) => {
  return getFilenameFromPath(path).split('.')[0];
};

export function normalizePictureUri(pictureUri: string) {
  return Platform.OS === 'android'
    ? pictureUri
    : pictureUri.replace('file://', '');
}

export const getImageUriForSize = (
  uri: string,
  {width, height}: {width?: number; height?: number},
) => {
  const queryWidth = width
    ? `&width=${PixelRatio.getPixelSizeForLayoutSize(width)}`
    : '';
  const queryHeight = height
    ? `&height=${PixelRatio.getPixelSizeForLayoutSize(height)}`
    : '';
  return `${uri}?quality=100${queryHeight}${queryWidth}`;
};

export const isRemoteImage = (uri: string) => {
  return uri.startsWith('https://');
};
