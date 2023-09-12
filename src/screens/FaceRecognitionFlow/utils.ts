// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {
  FACE_CONTAINER_ASPECT_RATIO,
  FACE_CONTAINER_PADDING_TOP,
  FACE_CONTAINER_WIDTH,
} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {Platform} from 'react-native';

export function getPictureCropStartY({
  safeAreaTopOffset,
  pictureWidth,
}: {
  safeAreaTopOffset: number;
  pictureWidth: number;
}) {
  const ovalCenterY =
    (Platform.OS === 'ios' ? safeAreaTopOffset : 0) +
    FACE_CONTAINER_PADDING_TOP +
    (FACE_CONTAINER_WIDTH * FACE_CONTAINER_ASPECT_RATIO) / 2;
  const windowToPhotoAspectRatio = windowWidth / pictureWidth;
  return Math.max(0, ovalCenterY / windowToPhotoAspectRatio - pictureWidth / 2);
}
