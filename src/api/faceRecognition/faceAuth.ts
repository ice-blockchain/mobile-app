// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
import {getFilenameFromPath, normalizePictureUri} from '@utils/file';

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
      uri: normalizePictureUri(pictureUri),
    },
  });
  return post<FormData, void>(`/face-auth/primary_photo/${userId}`, formData);
}
