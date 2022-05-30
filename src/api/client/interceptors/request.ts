// SPDX-License-Identifier: BUSL-1.1

import {AxiosRequestConfig} from 'axios';

// import StoreConfig from 'src/configureStore'; //TODO: configure redux store
// import AuthSelectors from '~/modules/Auth/selectors'; //TODO: configure redux store

async function onFulfilled(config: AxiosRequestConfig) {
  // if (!config.headers.Authorization) {
  //   const accessToken = AuthSelectors.getAccessToken(
  //     StoreConfig.store.getState(),
  //   );

  //   if (accessToken) {
  //     config.headers.Authorization = `Bearer ${accessToken}`;
  //   }
  // }

  return config;
}

export const requestInterceptor = {onFulfilled};
