// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
import {getFilenameFromPath, normalizePictureUri} from '@utils/file';

type Response = {skipEmotions?: boolean};

export function faceAuth({
  userId,
  pictureUri,
}: {
  userId: string;
  pictureUri: string;
}): Promise<Response> {
  const formData = buildFormData({
    image: {
      name: getFilenameFromPath(pictureUri),
      type: 'image/jpeg',
      uri: normalizePictureUri(pictureUri),
    },
  });
  return post<FormData, Response>(
    `/face-auth/primary_photo/${userId}`,
    formData,
  );
}
