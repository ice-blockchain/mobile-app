// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const faceAuthStatusSelector = (state: RootState) =>
  state.faceRecognition.faceAuthStatus;

export const emotionsAuthStatusSelector = (state: RootState) =>
  state.faceRecognition.emotionsAuthStatus;

export const emotionsAuthSessionSelector = (state: RootState) =>
  state.faceRecognition.sessionId;

export const emotionsAuthEmotionsSelector = (state: RootState) =>
  state.faceRecognition.emotions;

export const emotionsAuthFramesSelector = (state: RootState) =>
  state.faceRecognition.frames;
export const croppedPictureUriSelector = (state: RootState) =>
  state.faceRecognition.croppedPictureUri;
