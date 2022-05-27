// SPDX-License-Identifier: BUSL-1.1

import {Platform} from 'react-native';
import axios, {AxiosInstance} from 'axios';
import DeviceInfo from 'react-native-device-info';
import {ENV} from '@constants/env';
import {requestInterceptor} from '../../client/interceptors/request';
import {responseInterceptor} from '../../client/interceptors/response';
import {magicLink} from '@services/magicLink';

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
