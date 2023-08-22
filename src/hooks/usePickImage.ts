// SPDX-License-Identifier: ice License 1.0

import {FULL_SCREEN_IMAGE_SIZE} from '@constants/images';
import {logError} from '@services/logging';
import {t} from '@translations/i18n';
import {showError} from '@utils/errors';
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
      if (isPickerError(error)) {
        switch (error.code) {
          case 'E_PICKER_CANCELLED':
            return;
          case 'E_NO_CAMERA_PERMISSION':
            return showError(t('errors.no_camera_permissions'));
          case 'E_NO_LIBRARY_PERMISSION':
            return showError(t('errors.no_library_permissions'));
        }
      }

      if (isPermissionError(error)) {
        return showError(t('errors.no_library_permissions'));
      }

      logError(error);
    }
  };
  return {openPicker, onImageSelected};
};

const isPickerError = (error: unknown): error is {code: PickerErrorCode} => {
  return (
    checkProp(error, 'code') &&
    typeof error.code === 'string' &&
    error.code.startsWith('E_')
  );
};

const isPermissionError = (error: unknown) => {
  return (
    checkProp(error, 'code') &&
    typeof error.code === 'string' &&
    error.code.includes('EACCES')
  );
};
