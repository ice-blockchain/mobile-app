// SPDX-License-Identifier: ice License 1.0

import {buildFormData, post} from '@api/client';
import {AuthEmotion} from '@api/faceRecognition/types';
import {getFilenameFromPath, normalizePictureUri} from '@utils/file';

type Response = {
  result: boolean;
  sessionEnded: boolean;
  emotions: AuthEmotion[];
  sessionId: string;
  loginSession?: string;
};

export function emotionsAuth({
  userId,
  sessionId,
  pictureUris,
  isPhoneMigrationFlow,
  deviceUniqueId,
  language,
  email,
}: {
  userId: string;
  sessionId?: string | null;
  pictureUris: string[];
  isPhoneMigrationFlow?: boolean;
  deviceUniqueId?: string;
  language?: string;
  email?: string | null;
}): Promise<Response> {
  const formData = buildFormData({
    image: pictureUris.map(pictureUri => ({
      name: getFilenameFromPath(pictureUri),
      type: 'image/jpeg',
      uri: normalizePictureUri(pictureUri),
    })),
  });

  let migrationHeaders;

  if (isPhoneMigrationFlow) {
    migrationHeaders = {
      'X-Migrate-Phone-Number-To-Email': true,
      'X-Migrate-Phone-Number-Language': language,
      'X-Migrate-Phone-Number-Device-Unique-Id': deviceUniqueId,
      'X-Migrate-Phone-Number-Email': email,
    };
  }

  return post<FormData, Response>(
    `/face-auth/liveness/${userId}/${sessionId}`,
    formData,
    undefined,
    {
      headers: migrationHeaders,
    },
  );
}
