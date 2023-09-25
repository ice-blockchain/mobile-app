// SPDX-License-Identifier: ice License 1.0

import {EmotionsAuthStatus} from '@store/modules/FaceRecognition/types';

export function isEmotionsAuthFailed(status: EmotionsAuthStatus | null) {
  return (
    status === 'FAILED' ||
    status === 'BANNED' ||
    status === 'TRY_LATER' ||
    status === 'SESSION_EXPIRED'
  );
}
