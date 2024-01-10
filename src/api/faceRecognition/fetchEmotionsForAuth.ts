// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {AuthEmotion} from '@api/faceRecognition/types';

type Response = {
  emotions: AuthEmotion[];
  sessionId: string;
  sessionExpiredAt: string;
};

export function fetchEmotionsForAuth({
  userId,
  isPhoneMigrationFlow,
}: {
  userId: string;
  isPhoneMigrationFlow?: boolean;
}): Promise<Response> {
  let migrationHeaders;

  if (isPhoneMigrationFlow) {
    migrationHeaders = {
      'X-Migrate-Phone-Number-To-Email': true,
    };
  }

  return post<null, Response>(
    `/face-auth/emotions/${userId}`,
    null,
    undefined,
    {headers: migrationHeaders},
  );
}
