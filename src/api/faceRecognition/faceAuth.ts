// SPDX-License-Identifier: ice License 1.0

import {buildFormData} from '@api/client';
import {getFilenameFromPath} from '@utils/file';
import {Platform} from 'react-native';

export function faceAuth({
  userId,
  pictureUri,
}: {
  userId: string;
  pictureUri: string;
}): Promise<void> {
  const formData = buildFormData({
    image: {
      name: getFilenameFromPath(pictureUri),
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? pictureUri
          : pictureUri.replace('file://', ''),
    },
  });
  console.log({formData, userId});
  return Promise.resolve();
  // return post<FormData, void>(`/primary_photo/${userId}`, formData);
}
