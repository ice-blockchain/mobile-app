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
}: {
  userId: string;
}): Promise<Response> {
  return post<null, Response>(`/face-auth/emotions/${userId}`, null);
}
