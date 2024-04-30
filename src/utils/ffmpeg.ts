// SPDX-License-Identifier: ice License 1.0

import {VIDEO_QUALITY} from '@constants/faceRecognition';
import {windowWidth} from '@constants/styles';
import {
  FACE_CONTAINER_ASPECT_RATIO,
  FACE_CONTAINER_PADDING_TOP,
  FACE_CONTAINER_WIDTH,
} from '@screens/FaceRecognitionFlow/components/FaceAuthOverlay';
import {logError} from '@services/logging';
import {getFilenameFromPathWithoutExtension} from '@utils/file';
import {cacheDirectory} from 'expo-file-system';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {AppState} from 'react-native';
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

export async function cropAndResizeWithFFmpeg({
  inputUri,
  outputUri,
  imgWidth,
  outputSize,
  cropStartY,
}: {
  inputUri: string;
  outputUri: string;
  imgWidth: number;
  outputSize: number;
  cropStartY: number;
}) {
  try {
    const command = `-i "${inputUri}" -vf "crop=${imgWidth}:${imgWidth}:0:${cropStartY},scale=${outputSize}:${outputSize}" -update true "${outputUri}"`;
    const session = await FFmpegKit.execute(command);
    const returnCode = await session?.getReturnCode();

    if (returnCode?.isValueSuccess()) {
      return outputUri;
    } else {
      throw new Error(`Failed to execute FFmpeg command: ${command}`);
    }
  } catch (e) {
    logError(e);
    throw e;
  }
}

export async function extractFramesWithFFmpeg({
  inputUri,
  width,
  outputSize,
  cropStartY,
}: {
  inputUri: string;
  width: number;
  outputSize: number;
  cropStartY: number;
}): Promise<string[]> {
  let output;
  try {
    const outputUri = `${cacheDirectory}/${getFilenameFromPathWithoutExtension(
      inputUri,
    )}_%03d.jpg`;
    const command = `-i "${inputUri}" -vf "crop=${width}:${width}:0:${cropStartY},scale=${outputSize}:${outputSize},setsar=1,fps=3" "${outputUri}"`;
    const session = await FFmpegKit.execute(command);
    const returnCode = await session?.getReturnCode();

    if (!returnCode?.isValueSuccess()) {
      throw new Error(
        `Failed to execute FFmpeg command: ${command}. Return code is ${
          returnCode?.getValue() ?? 'unknown'
        }`,
      );
    }
    output = await session.getOutput();
    const numberOfFrames = parseInt(
      output
        .match(/frame=(.*?)(\d+)/g)
        ?.pop()
        ?.match(/\d+/)?.[0] ?? '',
      10,
    );
    if (!numberOfFrames || isNaN(numberOfFrames)) {
      throw new Error('Error parsing number of frames');
    }
    return Array(numberOfFrames)
      .fill(null)
      .map(
        (_, i) =>
          `${cacheDirectory}/${getFilenameFromPathWithoutExtension(
            inputUri,
          )}_${(i + 1).toString().padStart(3, '0')}.jpg`,
      );
  } catch (error) {
    if (AppState.currentState === 'active') {
      // * User sets the app to background during the func execution ->
      // * OS sets the app to low memory ->
      // * FFMpeg error.
      // Ignoring this kind of errors to reduce the noise in Sentry.
      logError(error, {output});
    }
    throw error;
  }
}

export type VideoDimensions = {width: number; height: number};

export function qualityToDimensions(quality: '720p' | '480p'): VideoDimensions {
  switch (quality) {
    case '720p':
      return {width: 720, height: 1280};
    default:
      return {width: 480, height: 720};
  }
}

export async function getVideoDimensionsWithFFmpeg(
  videoUri: string,
): Promise<VideoDimensions> {
  try {
    const session = await FFmpegKit.execute(`-i ${videoUri}`);
    const output = await session.getOutput();

    // Use regex to extract video dimensions from FFmpeg output
    const regex = /, (\d+)x(\d+),/;
    const match = output.match(regex);

    if (match) {
      const height = parseInt(match[1], 10);
      const width = parseInt(match[2], 10);
      return {width, height};
    }
  } catch {}
  return qualityToDimensions(VIDEO_QUALITY);
}
