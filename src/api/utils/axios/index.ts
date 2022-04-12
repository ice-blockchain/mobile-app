// SPDX-License-Identifier: BUSL-1.1

import {Platform} from 'react-native';
import axios, {AxiosInstance} from 'axios';
import DeviceInfo from 'react-native-device-info';
import env from 'src/constants/env';
import requestInterceptor from './interceptors/request';
import responseInterceptor from './interceptors/response';

export function setupInstance(instance: AxiosInstance) {
  instance.interceptors.request.use(requestInterceptor.onFulfilled);

  instance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected(instance),
  );
}

const instance = axios.create({
  baseURL: `${env.BASE_URL}/api`,
  headers: {
    'Mobile-App-Version': `${Platform.OS} - ${DeviceInfo.getVersion()}`,
  },
});

setupInstance(instance);

export default instance;
