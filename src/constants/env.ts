// SPDX-License-Identifier: BUSL-1.1

// eslint-disable-next-line no-restricted-imports
import config from 'react-native-config';

export const ENV = {
  BASE_URL: config.BASE_URL,
  SEGMENT_KEY: config.SEGMENT_KEY,
  SEGMENT_DEV_KEY: config.SEGMENT_KEY,
  MAGIC_LINK_KEY: config.MAGIC_LINK_KEY,
};
