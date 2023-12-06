// SPDX-License-Identifier: ice License 1.0

export type BaseAuthStatus =
  | 'LOADING'
  | 'SUCCESS'
  | 'FAILED'
  | 'BANNED'
  | 'TRY_LATER';

export type FaceAuthStatus = BaseAuthStatus | 'SUCCESS_BUT_SKIP_EMOTIONS';

export type EmotionsAuthStatus =
  | BaseAuthStatus
  | 'NEED_MORE_EMOTIONS'
  | 'SESSION_EXPIRED';

export type CameraRatio = '16:9' | '4:3';
