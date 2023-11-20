// SPDX-License-Identifier: ice License 1.0

import {FACE_RECOGNITION_PICTURE_SIZE} from '@constants/faceRecognition';
import {EmotionsAuthStatus} from '@store/modules/FaceRecognition/types';
import {cropAndResizeWithFFmpeg} from '@utils/ffmpeg';
import {getFilenameFromPath} from '@utils/file';
import * as FaceDetector from 'expo-face-detector';
import {
  FaceDetectorClassifications,
  FaceDetectorLandmarks,
  FaceDetectorMode,
} from 'expo-face-detector/src/FaceDetector';
import {cacheDirectory} from 'expo-file-system';

export function isEmotionsAuthFinalised(status: EmotionsAuthStatus | null) {
  return (
    status === 'FAILED' ||
    status === 'BANNED' ||
    status === 'TRY_LATER' ||
    status === 'SUCCESS' ||
    status === 'SESSION_EXPIRED'
  );
}

export async function getCroppedPictureUri({
  pictureUri,
  pictureWidth,
  cropStartY,
  faceDetectionEnabled,
}: {
  pictureUri: string;
  pictureWidth: number;
  cropStartY: number;
  faceDetectionEnabled: boolean;
}) {
  if (faceDetectionEnabled) {
    const result = await FaceDetector.detectFacesAsync(pictureUri, {
      mode: FaceDetectorMode.accurate,
      detectLandmarks: FaceDetectorLandmarks.none,
      runClassifications: FaceDetectorClassifications.none,
    });
    const face = result?.faces?.[0];
    if (face) {
      const {size, origin} = face.bounds;
      const isTaller = size.height > size.width;
      const faceCropStartX = isTaller
        ? origin.x - (size.height - size.width) / 2
        : origin.x;
      const faceCropStartY = origin.y;
      const imgWidth = Math.max(size.width, size.height, pictureWidth);
      return cropAndResizeWithFFmpeg({
        inputUri: pictureUri,
        outputUri: `${cacheDirectory}/cropped_${getFilenameFromPath(
          pictureUri,
        )}`,
        cropStartY: faceCropStartY,
        cropStartX: faceCropStartX,
        imgWidth,
        outputSize: FACE_RECOGNITION_PICTURE_SIZE,
      });
    }
  }
  return cropAndResizeWithFFmpeg({
    inputUri: pictureUri,
    outputUri: `${cacheDirectory}/cropped_${getFilenameFromPath(pictureUri)}`,
    imgWidth: pictureWidth,
    cropStartY,
    cropStartX: 0,
    outputSize: FACE_RECOGNITION_PICTURE_SIZE,
  });
}
