// SPDX-License-Identifier: ice License 1.0

import {FULL_SCREEN_IMAGE_SIZE} from '@constants/images';
import {getImageUriForSize, isRemoteImage} from '@utils/file';
import {useEffect, useState} from 'react';
import {Image} from 'react-native';

export const useImageSizedUri = (uri: string, initialSize: number) => {
  const isRemote = isRemoteImage(uri);
  const [imageUri, setImageUri] = useState(
    isRemote ? getImageUriForSize(uri, {width: initialSize}) : uri,
  );

  useEffect(() => {
    if (isRemote) {
      const prefetch = async () => {
        try {
          const fullScreeUri = getImageUriForSize(uri, {
            width: FULL_SCREEN_IMAGE_SIZE,
          });
          await Image.prefetch(fullScreeUri);
          setImageUri(fullScreeUri);
        } catch {}
      };
      prefetch();
    }
  }, [isRemote, uri]);

  return {imageUri};
};
