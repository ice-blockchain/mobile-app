// SPDX-License-Identifier: ice License 1.0

export type FaceAuthStatus =
  | 'LOADING'
  | 'SUCCESS'
  | 'FAILED'
  | 'BANNED'
  | 'TRY_LATER';

export type EmotionsAuthStatus =
  | 'LOADING'
  | 'SUCCESS'
  | 'FAILED'
  | 'BANNED'
  | 'NEED_MORE_EMOTIONS'
  | 'SESSION_EXPIRED'
  | 'TRY_LATER';

export type CameraRatio = '16:9' | '4:3';
