// SPDX-License-Identifier: ice License 1.0

import {buildFormData} from '@api/client';
import {getFilenameFromPath} from '@utils/file';
import {Platform} from 'react-native';

export function emotionsAuth({
  userId,
  sessionId,
  pictureUris,
}: {
  userId: string;
  sessionId?: string | null;
  pictureUris: string[];
}): Promise<void> {
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
  console.log({formData, userId, sessionId});
  return Promise.resolve();
  // return post<FormData, void>(`/liveness/${userId}/${sessionId}`, formData);
}
