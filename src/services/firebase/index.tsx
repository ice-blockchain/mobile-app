// SPDX-License-Identifier: ice License 1.0

import firebaseApp from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {isIOS} from 'rn-units';

export const isPlayServicesAvailable =
  firebaseApp.utils().playServicesAvailability.isAvailable;

export const getFcmToken = async () => {
  try {
    if (isIOS || isPlayServicesAvailable) {
      return await messaging().getToken();
    }
    return '';
  } catch (error) {
    return '';
  }
};
