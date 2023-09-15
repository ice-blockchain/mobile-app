// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {AccountActions} from '@store/modules/Account/actions';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  EmotionsAuthStatus,
  FaceAuthStatus,
} from '@store/modules/FaceRecognition/types';
import produce from 'immer';

export interface State {
  faceAuthStatus: FaceAuthStatus | null;
  emotionsAuthStatus: EmotionsAuthStatus | null;
  sessionId: string | null;
  emotions: AuthEmotion[];
  croppedPictureUri?: string;
  frames?: string[];
}

type Actions = ReturnType<
  | typeof FaceRecognitionActions.FACE_AUTH.START.create
  | typeof FaceRecognitionActions.FACE_AUTH.COMPLETE_WITH_STATUS.create
  | typeof FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.create
  | typeof FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.START.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.create
  | typeof FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.create
  | typeof FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  faceAuthStatus: null,
  emotionsAuthStatus: null,
  sessionId: null,
  emotions: [],
};

export function faceRecognitionReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case FaceRecognitionActions.FACE_AUTH.START.type:
        draft.faceAuthStatus = 'LOADING';
        break;
      case FaceRecognitionActions.FACE_AUTH.COMPLETE_WITH_STATUS.type:
        draft.faceAuthStatus = action.payload.status;
        draft.croppedPictureUri = action.payload.croppedPictureUri;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.type:
        draft.emotions = action.payload.emotions;
        draft.sessionId = action.payload.sessionId;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.type:
        draft.emotionsAuthStatus = action.payload.status;
        draft.emotions = [];
        draft.sessionId = null;
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.START.type:
        draft.emotionsAuthStatus = 'LOADING';
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.COMPLETE_WITH_STATUS.type:
        draft.emotionsAuthStatus = action.payload.status;
        draft.frames = action.payload.frames;
        if (
          draft.emotionsAuthStatus !== 'SUCCESS' &&
          draft.emotionsAuthStatus !== 'LOADING'
        ) {
          draft.emotions = [];
          draft.sessionId = null;
        }
        break;
      case FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.type:
        draft.faceAuthStatus = null;
        break;
      case FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.type:
        draft.emotionsAuthStatus = null;
        draft.emotions = [];
        draft.sessionId = null;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}
