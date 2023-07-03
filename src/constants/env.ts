// SPDX-License-Identifier: ice License 1.0

// eslint-disable-next-line no-restricted-imports
import config from 'react-native-config';
import {isAndroid} from 'rn-units';

export const ENV = {
  APP_ID: config.APP_ID,
  APPSTORE_APP_ID: config.APPSTORE_APP_ID,
  BASE_READ_API_URL: config.BASE_READ_API_URL,
  BASE_WRITE_API_URL: config.BASE_WRITE_API_URL,
  BLOCK_EXPLORER_URL: config.BLOCK_EXPLORER_URL,
  SENTRY_KEY: config.SENTRY_KEY,
  REQUIRE_REFERRAL_REGISTRATION_STEP:
    config.REQUIRE_REFERRAL_REGISTRATION_STEP === 'true',
  GETSTREAM_API_KEY: config.GETSTREAM_API_KEY,
  GETSTREAM_APP_ID: config.GETSTREAM_APP_ID,
  GETSTREAM_TOKEN: config.GETSTREAM_TOKEN,
  GETSTREAM_NOTIFICATIONS_USER_TOKEN: config.GETSTREAM_NOTIFICATIONS_USER_TOKEN,
  GETSTREAM_ANNOUNCEMENTS_USER_TOKEN: config.GETSTREAM_ANNOUNCEMENTS_USER_TOKEN,
  DEEPLINK_SCHEME: config.DEEPLINK_SCHEME,
  DEEPLINK_DOMAIN: config.DEEPLINK_DOMAIN,
  GOOGLE_WEB_CLIENT_ID: isAndroid
    ? config.GOOGLE_WEB_CLIENT_ID_ANDROID
    : config.GOOGLE_WEB_CLIENT_ID_IOS,
  FACEBOOK_APP_ID: config.FACEBOOK_APP_ID,
  FACEBOOK_PAGE_ID: config.FACEBOOK_PAGE_ID,
  MO_ENGAGE_APP_ID: config.MO_ENGAGE_APP_ID,
  APP_AUTO_UPDATE_INTERVAL_SEC: Number(config.APP_AUTO_UPDATE_INTERVAL_SEC),
  HOME_REFRESH_MIN_INTERVAL_SEC: Number(config.HOME_REFRESH_MIN_INTERVAL_SEC),
  RELEASE_DATE: config.RELEASE_DATE,
  SHOW_MINING_NOTICE: config.SHOW_MINING_NOTICE === 'true',
  YOUTUBE_CHANNEL_ID: config.YOUTUBE_CHANNEL_ID,
  MINING_RATE_INTERVAL_SEC: Number(config.MINING_RATE_INTERVAL_SEC),
  STATUS_NOTICE_JSON: config.STATUS_NOTICE_JSON,
};

/**
 * Check if all the ENV variables are successfully picked from the .env.app
 */
Object.entries(ENV).forEach(([key, value]) => {
  if (value == null || (typeof value === 'number' && isNaN(value))) {
    throw new Error(`Incorrect ENV variable for ${key}`);
  }
});
