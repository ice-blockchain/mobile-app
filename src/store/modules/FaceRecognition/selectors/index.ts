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
export const emotionsAuthNextEmotionIndexSelector = (state: RootState) =>
  state.faceRecognition.nextEmotionIndex;
export const cameraRatioSelector = (state: RootState) =>
  state.faceRecognition.cameraRatio;
