// SPDX-License-Identifier: BUSL-1.1

import {ENV} from '@constants/env';
import {magicLink} from '@services/magicLink';
import axios, {AxiosInstance} from 'axios';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {requestInterceptor} from '../../client/interceptors/request';
import {responseInterceptor} from '../../client/interceptors/response';

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
