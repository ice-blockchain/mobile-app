// SPDX-License-Identifier: ice License 1.0

import {FULL_SCREEN_IMAGE_SIZE} from '@constants/images';
import {logError} from '@services/logging';
import {checkProp} from '@utils/guards';
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
  const openPicker = async (mode: 'gallery' | 'camera') => {
    try {
      const selectedImage = await ImagePicker[
        mode === 'gallery' ? 'openPicker' : 'openCamera'
      ]({
        mediaType: 'photo',
        cropping: false,
        forceJpg: true,
        includeBase64: false,
        includeExif: false,
        ...options,
      });
      /**
       * Call openPicker/openCamera and openCropper separately
       * so library converts selected image to jpg before cropping.
       * This workaround saves from variety of errors on android (e.g. when picking webp)
       */
      const croppedImage = await ImagePicker.openCropper({
        mediaType: 'photo',
        path: selectedImage.path,
        width: FULL_SCREEN_IMAGE_SIZE,
        height: FULL_SCREEN_IMAGE_SIZE,
        includeBase64: false,
        includeExif: false,
      });
      onImageSelected(croppedImage);
    } catch (error) {
      if (
        checkProp(error, 'code') &&
        (error.code as PickerErrorCode) !== 'E_PICKER_CANCELLED'
      ) {
        logError(error);
      }
    }
  };
  return {openPicker, onImageSelected};
};
