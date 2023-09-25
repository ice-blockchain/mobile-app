// SPDX-License-Identifier: ice License 1.0

import {post, put} from '@api/client';
import {AuthEmotion} from '@api/faceRecognition/types';

type Response = {
  emotions: AuthEmotion[];
  sessionId: string;
  sessionExpiredAt?: string;
};

export function fetchEmotionsForAuth({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId?: string | null;
}): Promise<Response> {
  if (sessionId) {
    return put<null, Response>(
      `/face-auth/emotions/${userId}/${sessionId}`,
      null,
    );
  }
  return post<null, Response>(`/face-auth/emotions/${userId}`, null);
}
