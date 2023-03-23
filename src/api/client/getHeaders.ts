// SPDX-License-Identifier: ice License 1.0

import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const getHeaders = () => {
  return {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
  };
};
