// SPDX-License-Identifier: ice License 1.0

import {EmotionsAuthStatus} from '@store/modules/FaceRecognition/types';

export function isEmotionsAuthFinalised(status: EmotionsAuthStatus | null) {
  return (
    status === 'FAILED' ||
    status === 'BANNED' ||
    status === 'TRY_LATER' ||
    status === 'SUCCESS' ||
    status === 'SESSION_EXPIRED'
  );
}
