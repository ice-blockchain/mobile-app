// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
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
  sessionExpiredAt: number | null;
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
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  faceAuthStatus: null,
  emotionsAuthStatus: null,
  sessionId: null,
  emotions: [],
  nextEmotionIndex: 0,
  sessionExpiredAt: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    const resetSession = () => {
      draft.emotions = [];
      draft.sessionId = null;
      draft.nextEmotionIndex = 0;
      draft.sessionExpiredAt = null;
    };
    switch (action.type) {
      case FaceRecognitionActions.FACE_AUTH.START.type:
        draft.faceAuthStatus = 'LOADING';
        break;
      case FaceRecognitionActions.FACE_AUTH.SUCCESS.type:
        draft.faceAuthStatus = 'SUCCESS';
        break;
      case FaceRecognitionActions.FACE_AUTH.FAILURE.type:
        draft.faceAuthStatus = action.payload.status;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.SUCCESS.type:
        draft.emotions = action.payload.emotions;
        draft.sessionId = action.payload.sessionId;
        draft.sessionExpiredAt = action.payload.sessionExpiredAt;
        break;
      case FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.FAILURE.type:
        draft.emotionsAuthStatus = action.payload.status;
        resetSession();
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.START.type:
        draft.emotionsAuthStatus = 'LOADING';
        draft.nextEmotionIndex += 1;
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.SUCCESS.type:
        draft.emotionsAuthStatus = 'SUCCESS';
        resetSession();
        break;
      case FaceRecognitionActions.EMOTIONS_AUTH.NEED_MORE_EMOTIONS.type:
        draft.emotionsAuthStatus = 'NEED_MORE_EMOTIONS';
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
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}

export const faceRecognitionReducer = persistReducer(
  {
    key: 'faceRecognition',
    storage: AsyncStorage,
    whitelist: [
      'sessionId',
      'emotions',
      'nextEmotionIndex',
      'sessionExpiredAt',
    ],
  },
  reducer,
);
