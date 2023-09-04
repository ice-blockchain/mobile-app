// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const FACE_AUTH = createAction('FACE_AUTH', {
  START: (payload: {facePhotoUri: string}) => payload,
  SUCCESS: true,
  FAILED: true,
});

const RESET_FACE_AUTH_STATUS = createAction('RESET_FACE_AUTH_STATUS', {
  STATE: true,
});

export const FaceAuthActions = Object.freeze({
  FACE_AUTH,
  RESET_FACE_AUTH_STATUS,
});
