// SPDX-License-Identifier: ice License 1.0

import {FaceAuthStatus} from '@store/modules/FaceAuth/types';
import {createAction} from '@store/utils/actions/createAction';

const FACE_AUTH = createAction('FACE_AUTH', {
  START: (payload: {
    pictureUri: string;
    cropStartY: number;
    pictureWidth: number;
  }) => payload,
  COMPLETE_WITH_STATUS: (payload: {status: FaceAuthStatus}) => payload,
});

const RESET_FACE_AUTH_STATUS = createAction('RESET_FACE_AUTH_STATUS', {
  STATE: true,
});

export const FaceAuthActions = Object.freeze({
  FACE_AUTH,
  RESET_FACE_AUTH_STATUS,
});
