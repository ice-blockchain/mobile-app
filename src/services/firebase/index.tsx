// SPDX-License-Identifier: ice License 1.0

import firebaseApp from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {logError} from '@services/logging';
import {isIOS} from 'rn-units';

export const getFcmToken = () => {
  try {
    if (isIOS || firebaseApp.utils().playServicesAvailability.isAvailable) {
      return messaging().getToken();
    }
    return '';
  } catch (error) {
    logError(error);
    return '';
  }
};
