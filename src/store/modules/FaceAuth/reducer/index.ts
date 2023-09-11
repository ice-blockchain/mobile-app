// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {FaceAuthActions} from '@store/modules/FaceAuth/actions';
import {FaceAuthStatus} from '@store/modules/FaceAuth/types';
import produce from 'immer';

export interface State {
  faceAuthStatus?: FaceAuthStatus;
  croppedPictureUri?: string;
}

type Actions = ReturnType<
  | typeof FaceAuthActions.FACE_AUTH.START.create
  | typeof FaceAuthActions.FACE_AUTH.COMPLETE_WITH_STATUS.create
  | typeof FaceAuthActions.RESET_FACE_AUTH_STATUS.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {};

export function faceAuthReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case FaceAuthActions.FACE_AUTH.START.type:
        draft.faceAuthStatus = 'LOADING';
        break;
      case FaceAuthActions.FACE_AUTH.COMPLETE_WITH_STATUS.type:
        draft.faceAuthStatus = action.payload.status;
        break;
      case FaceAuthActions.RESET_FACE_AUTH_STATUS.STATE.type:
        draft.faceAuthStatus = undefined;
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type:
        return {...INITIAL_STATE};
    }
  });
}
