// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {getFilenameFromPathWithoutExtension} from '@utils/file';
import {cacheDirectory} from 'expo-file-system';
import {FFmpegKit} from 'ffmpeg-kit-react-native';

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
      throw new Error(`Failed to execute FFmpeg command: ${command}`);
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
    logError(error, {output});
    throw error;
  }
}

export async function getVideoDimensionsWithFFmpeg(videoUri: string) {
  let output;
  try {
    const session = await FFmpegKit.execute(`-i ${videoUri}`);
    output = await session.getOutput();

    // Use regex to extract video dimensions from FFmpeg output
    const regex = /, (\d+)x(\d+),/;
    const match = output.match(regex);

    if (match) {
      const height = parseInt(match[1], 10);
      const width = parseInt(match[2], 10);
      return {width, height};
    } else {
      throw new Error('Failed to extract video dimensions.');
    }
  } catch (error) {
    logError(error, {output});
    throw error;
  }
}
