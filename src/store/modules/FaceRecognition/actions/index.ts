// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {
  EmotionsAuthStatus,
  FaceAuthStatus,
} from '@store/modules/FaceRecognition/types';
import {createAction} from '@store/utils/actions/createAction';

const FACE_AUTH = createAction('FACE_AUTH', {
  START: (payload: {
    pictureUri: string;
    cropStartY: number;
    pictureWidth: number;
  }) => payload,
  SUCCESS: true,
  FAILURE: (payload: {status: FaceAuthStatus}) => payload,
});

const FETCH_EMOTIONS_FOR_AUTH = createAction('FETCH_EMOTIONS_FOR_AUTH', {
  START: true,
  SUCCESS: (payload: {
    emotions: AuthEmotion[];
    sessionId: string;
    sessionExpiredAt: number;
  }) => payload,
  FAILURE: (payload: {status: EmotionsAuthStatus}) => payload,
});

const EMOTIONS_AUTH = createAction('EMOTIONS_AUTH', {
  START: (payload: {
    videoUri: string;
    cropStartY: number;
    videoWidth: number;
  }) => payload,
  NEED_MORE_EMOTIONS: (payload: {emotions: AuthEmotion[]}) => payload,
  SUCCESS: true,
  FAILURE: (payload: {status: EmotionsAuthStatus}) => payload,
});

const RESET_FACE_AUTH_STATUS = createAction('RESET_FACE_AUTH_STATUS', {
  STATE: true,
});

const RESET_EMOTIONS_AUTH_STATUS = createAction('RESET_EMOTIONS_AUTH_STATUS', {
  STATE: true,
});

export const FaceRecognitionActions = Object.freeze({
  FACE_AUTH,
  EMOTIONS_AUTH,
  FETCH_EMOTIONS_FOR_AUTH,
  RESET_FACE_AUTH_STATUS,
  RESET_EMOTIONS_AUTH_STATUS,
});
