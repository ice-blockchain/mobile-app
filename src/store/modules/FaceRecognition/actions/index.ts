// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {
  CameraRatio,
  EmotionsAuthStatus,
  FaceAuthStatus,
} from '@store/modules/FaceRecognition/types';
import {createAction} from '@store/utils/actions/createAction';

const FACE_AUTH = createAction('FACE_AUTH', {
  START: (payload: {
    pictureUri: string;
    pictureWidth: number;
    pictureHeight: number;
  }) => payload,
  SUCCESS: (payload: {skipEmotions?: boolean}) => payload,
  FAILURE: (payload: {status: FaceAuthStatus}) => payload,
});

const FETCH_EMOTIONS_FOR_AUTH = createAction('FETCH_EMOTIONS_FOR_AUTH', {
  START: (isPhoneMigrationFlow: boolean) => ({isPhoneMigrationFlow}),
  SUCCESS: (payload: {emotions: AuthEmotion[]; sessionId: string}) => payload,
  FAILURE: (payload: {status: EmotionsAuthStatus}) => payload,
});

const EMOTIONS_AUTH = createAction('EMOTIONS_AUTH', {
  START: (payload: {
    videoUri: string;
    videoWidth: number;
    videoHeight: number;
    isPhoneMigrationFlow: boolean;
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

const SET_CAMERA_RATIO = createAction('SET_CAMERA_RATIO', {
  STATE: (payload: {cameraRatio: CameraRatio}) => payload,
});

export const FaceRecognitionActions = Object.freeze({
  FACE_AUTH,
  EMOTIONS_AUTH,
  FETCH_EMOTIONS_FOR_AUTH,
  RESET_FACE_AUTH_STATUS,
  RESET_EMOTIONS_AUTH_STATUS,
  SET_CAMERA_RATIO,
});
