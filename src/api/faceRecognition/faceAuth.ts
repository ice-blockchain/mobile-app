// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
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
  return post<FormData, void>(`/face-auth/primary_photo/${userId}`, formData);
}
