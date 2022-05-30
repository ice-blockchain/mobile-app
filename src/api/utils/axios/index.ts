// SPDX-License-Identifier: BUSL-1.1

import {requestInterceptor} from '@api/client/interceptors/request';
import {responseInterceptor} from '@api/client/interceptors/response';
import {ENV} from '@constants/env';
import {magicLink} from '@services/magicLink';
import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function setupInstance(instance: AxiosInstance) {
  instance.interceptors.request.use(requestInterceptor.onFulfilled);

  instance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected(instance),
  );
}

export const instance = axios.create({
  baseURL: `${ENV.BASE_URL}/api`,
  headers: {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
    Authorization: `Bearer ${magicLink.token}`,
  },
});

setupInstance(instance);
