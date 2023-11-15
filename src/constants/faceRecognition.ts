// SPDX-License-Identifier: ice License 1.0

import {degreesToRadians} from '@utils/units';
import {VideoQuality} from 'expo-camera';
import {Platform} from 'react-native';

export const FACE_RECOGNITION_PICTURE_SIZE = 224;

export const VIDEO_DURATION_SEC = 5;

export const DEVICE_Y_ALLOWED_ROTATION_RADIANS = degreesToRadians(60);

export const VIDEO_QUALITY =
  VideoQuality[Platform.OS === 'ios' ? '720p' : '480p'];
