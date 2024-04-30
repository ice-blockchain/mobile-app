// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  CameraRatio,
  EmotionsAuthStatus,
  FaceAuthStatus,
} from '@store/modules/FaceRecognition/types';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  faceAuthStatus: FaceAuthStatus | null;
  emotionsAuthStatus: EmotionsAuthStatus | null;

  sessionId: string | null;
  emotions: AuthEmotion[];
  nextEmotionIndex: number;
  activeRequests: number;
  cameraRatio: CameraRatio;
}

type Actions = ReturnType<
  | typeof FaceRecognitionActions.FACE_AUTH.START.create
  | typeof FaceRecognitionActions.FACE_AUTH.SUCCESS.create
  | typeof FaceRecognitionActions.FACE_AUTH.FAILURE.create
  | typeof FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.create
  | typeof FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.START.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.SUCCESS.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.NEED_MORE_EMOTIONS.create
  | typeof FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.create
  | typeof FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.create
  | typeof FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.create
  | typeof FaceRecognitionActions.SET_CAMERA_RATIO.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  faceAuthStatus: null,
  emotionsAuthStatus: null,
  sessionId: null,
  emotions: [],
  nextEmotionIndex: 0,
  activeRequests: 0,
  cameraRatio: '16:9',
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    const resetSession = () => {
      draft.emotions = [];
      draft.sessionId = null;
      draft.nextEmotionIndex = 0;
      draft.activeRequests = 0;
    };
    switch (action.type) {
      case FaceRecognitionActions.FACE_AUTH.START.type:
        draft.faceAuthStatus = 'LOADING';
        break;
      case FaceRecognitionActions.FACE_AUTH.SUCCESS.type:
        draft.faceAuthStatus = action.payload.skipEmotions
          ? 'SUCCESS_BUT_SKIP_EMOTIONS'
          : 'SUCCESS';
        break;
      case FaceRecognitionActions.FACE_AUTH.FAILURE.type:
        draft.faceAuthStatus = action.payload.status;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.type:
        if (draft.sessionId !== action.payload.sessionId) {
          resetSession();
        }
        draft.emotions = action.payload.emotions;
        draft.sessionId = action.payload.sessionId;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.type:
        draft.emotionsAuthStatus = action.payload.status;
        resetSession();
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.START.type:
        draft.emotionsAuthStatus = 'LOADING';
        draft.nextEmotionIndex += 1;
        draft.activeRequests += 1;
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.SUCCESS.type:
        draft.emotionsAuthStatus = 'SUCCESS';
        resetSession();
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.NEED_MORE_EMOTIONS.type:
        draft.activeRequests -= 1;
        // Else if there are still not completed requests to process an emotion then keep the loading status
        if (!draft.activeRequests) {
          draft.emotionsAuthStatus = 'NEED_MORE_EMOTIONS';
        }
        draft.emotions = action.payload.emotions;
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.FAILURE.type:
        draft.emotionsAuthStatus = action.payload.status;
        resetSession();
        break;
      case FaceRecognitionActions.RESET_FACE_AUTH_STATUS.STATE.type:
        draft.faceAuthStatus = null;
        break;
      case FaceRecognitionActions.RESET_EMOTIONS_AUTH_STATUS.STATE.type:
        draft.emotionsAuthStatus = null;
        resetSession();
        break;
      case FaceRecognitionActions.SET_CAMERA_RATIO.STATE.type:
        draft.cameraRatio = action.payload.cameraRatio;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE, cameraRatio: draft.cameraRatio};
    }
  });
}

export const faceRecognitionReducer = persistReducer(
  {
    key: 'faceRecognition',
    storage: AsyncStorage,
    whitelist: ['sessionId', 'emotions', 'nextEmotionIndex', 'cameraRatio'],
  },
  reducer,
);
