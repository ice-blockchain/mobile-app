// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {
  FACE_CONTAINER_ASPECT_RATIO,
  FACE_CONTAINER_PADDING_TOP,
  FACE_CONTAINER_WIDTH,
} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {screenHeight} from 'rn-units';

export function getPictureCropStartY({
  pictureWidth,
  pictureHeight,
}: {
  pictureWidth: number;
  pictureHeight: number;
}) {
  const windowToPhotoAspectRatio = windowWidth / pictureWidth;
  const cameraHeight = (pictureHeight / pictureWidth) * windowWidth;
  const topOffset = (screenHeight - cameraHeight) / 2;
  const ovalCenterY =
    FACE_CONTAINER_PADDING_TOP +
    FACE_CONTAINER_WIDTH / FACE_CONTAINER_ASPECT_RATIO / 2 -
    topOffset;
  return Math.max(0, ovalCenterY / windowToPhotoAspectRatio - pictureWidth / 2);
}
