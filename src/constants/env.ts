// SPDX-License-Identifier: BUSL-1.1

// eslint-disable-next-line no-restricted-imports
import config from 'react-native-config';

export const ENV = {
  BASE_READ_API_URL: config.BASE_BASE_READ_API_URL,
  BASE_WRITE_API_URL: config.BASE_WRITE_API_URL,
  MAGIC_LINK_KEY: config.MAGIC_LINK_KEY,
  MAGIC_DEEPLINK_SCHEME: config.MAGIC_DEEPLINK_SCHEME,
};
