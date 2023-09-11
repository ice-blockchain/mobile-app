// SPDX-License-Identifier: ice License 1.0

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
  const command = `-i "${inputUri}" -vf "crop=${imgWidth}:${imgWidth}:0:${cropStartY},scale=${outputSize}:${outputSize}" -update true "${outputUri}"`;
  const session = await FFmpegKit.execute(command);
  const returnCode = await session?.getReturnCode();

  if (returnCode?.isValueSuccess()) {
    return outputUri;
  } else {
    throw new Error('Failed to crop image');
  }
}
