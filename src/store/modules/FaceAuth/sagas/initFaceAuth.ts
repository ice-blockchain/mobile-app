// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {FaceAuthActions} from '@store/modules/FaceAuth/actions';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {call, put, SagaReturnType} from 'redux-saga/effects';

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
    const e = new Error(`Failed to execute FFmpeg command: ${command}`);
    logError(e);
    throw e;
  }
}

type Actions = ReturnType<typeof FaceAuthActions.FACE_AUTH.START.create>;

export function* initFaceAuthSaga(action: Actions) {
  try {
    const {pictureUri, cropStartY, pictureWidth} = action.payload;
    const fileExtension = pictureUri.slice(pictureUri.lastIndexOf('.') + 1);
    const baseUri = pictureUri.substring(0, pictureUri.lastIndexOf('.'));
    const outputUri = `${baseUri}_cropped.${fileExtension}`;

    const croppedPictureUri: SagaReturnType<typeof cropAndResizeWithFFmpeg> =
      yield call(cropAndResizeWithFFmpeg, {
        inputUri: pictureUri,
        outputUri,
        imgWidth: pictureWidth,
        cropStartY,
        outputSize: 224,
      });

    // TODO: call face auth API
    console.log({croppedPictureUri});
    yield put(
      FaceAuthActions.FACE_AUTH.COMPLETE_WITH_STATUS.create({
        status: 'SUCCESS',
      }),
    );
  } catch (e) {
    yield put(
      FaceAuthActions.FACE_AUTH.COMPLETE_WITH_STATUS.create({
        status: 'FAILED',
      }),
    );
  }
}
