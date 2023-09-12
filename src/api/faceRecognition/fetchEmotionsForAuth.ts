// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';

type Response = {
  emotions: AuthEmotion[];
  sessionId: string;
};

export function fetchEmotionsForAuth({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId?: string | null;
}): Promise<Response> {
  if (sessionId) {
    return Promise.resolve({
      emotions: ['anger'],
      sessionId: 'did:ethr:0x4B73C58370AEfcEf86A6021afCDe5673511376B2',
    });
    // return put<null, Response>(`/emotions/${userId}/${sessionId}`, null);
  }
  // return post<null, Response>(`/emotions/${userId}`, null);
  console.log({userId});
  return Promise.resolve({
    emotions: ['anger'],
    sessionId: 'did:ethr:0x4B73C58370AEfcEf86A6021afCDe5673511376B2',
  });
}
