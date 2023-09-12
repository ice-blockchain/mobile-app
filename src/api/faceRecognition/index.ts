// SPDX-License-Identifier: ice License 1.0

import {emotionsAuth} from '@api/faceRecognition/emotionsAuth';
import {faceAuth} from '@api/faceRecognition/faceAuth';
import {fetchEmotionsForAuth} from '@api/faceRecognition/fetchEmotionsForAuth';

export const faceRecognition = Object.freeze({
  fetchEmotionsForAuth,
  faceAuth,
  emotionsAuth,
});
