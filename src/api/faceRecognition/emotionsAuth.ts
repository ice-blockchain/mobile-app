// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
import {AuthEmotion} from '@api/faceRecognition/types';
import {getFilenameFromPath, normalizePictureUri} from '@utils/file';

type Response = {
  result: boolean;
  sessionEnded: boolean;
  emotions: AuthEmotion[];
  sessionId: string;
};

export function emotionsAuth({
  userId,
  sessionId,
  pictureUris,
}: {
  userId: string;
  sessionId?: string | null;
  pictureUris: string[];
}): Promise<Response> {
  const formData = buildFormData({
    image: pictureUris.map(pictureUri => ({
      name: getFilenameFromPath(pictureUri),
      type: 'image/jpeg',
      uri: normalizePictureUri(pictureUri),
    })),
  });
  return post<FormData, Response>(
    `/face-auth/liveness/${userId}/${sessionId}`,
    formData,
  );
}
