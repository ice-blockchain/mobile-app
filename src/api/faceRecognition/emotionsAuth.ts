// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
import {getFilenameFromPath} from '@utils/file';
import {Platform} from 'react-native';

type Response = {
  result: boolean;
  sessionEnded: boolean;
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
      uri:
        Platform.OS === 'android'
          ? pictureUri
          : pictureUri.replace('file://', ''),
    })),
  });
  // return Promise.resolve();
  return post<FormData, Response>(
    `/face-auth/liveness/${userId}/${sessionId}`,
    formData,
  );
}
