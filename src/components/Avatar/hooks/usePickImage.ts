// SPDX-License-Identifier: ice License 1.0

import {FULL_SCREEN_IMAGE_SIZE} from '@constants/images';
import {logError} from '@services/logging';
import ImagePicker, {
  Image,
  Options,
  PickerErrorCode,
} from 'react-native-image-crop-picker';

export const usePickImage = ({
  onImageSelected,
  options,
}: {
  onImageSelected: (image: Image) => void;
  options?: Options;
}) => {
  const openPicker = (mode: 'gallery' | 'camera') =>
    ImagePicker[mode === 'gallery' ? 'openPicker' : 'openCamera']({
      width: FULL_SCREEN_IMAGE_SIZE,
      height: FULL_SCREEN_IMAGE_SIZE,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
      includeBase64: false,
      includeExif: false,
      ...options,
    })
      .then(onImageSelected)
      .catch(error => {
        if ((error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED') {
          logError(error);
        }
      });
  return {openPicker, onImageSelected};
};
