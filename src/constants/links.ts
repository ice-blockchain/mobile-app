// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {t} from '@translations/i18n';

export const LINKS = {
  APP_STORE: `https://apps.apple.com/app/${ENV.APPSTORE_APP_ID}`,
  PLAY_STORE: `https://play.google.com/store/apps/details?id=${ENV.APP_ID}`,
  PRE_STAKING: t('links.pre_staking'),
  PRIVACY: t('links.privacy'),
  TERMS: t('links.terms'),
  MAIN: t('links.main'),
  BLOCK_EXPLORER: ENV.BLOCK_EXPLORER_URL,
  FIREBASE_NOTICE: 'https://ice.io/firebase-notice',
  KNOWLEDGE_BASE: 'https://ice.io/knowledge-base',
  BONUSES: 'https://ice.io/bonuses',
  TEAM: 'https://ice.io/team',
  FEEDBACK_EMAIL: 'feedback@ice.io',
  CONFIRM_EMAIL: 'https://ice.io/firebase-confirm-email',
  VERIFY_EMAIL: `https://${ENV.DEEPLINK_DOMAIN}/verify-email`,
  TWITTER_SCHEME: 'twitter://',
  TWITTER_APP_URL: 'twitter://user?screen_name=ice_blockchain',
  TWITTER_PROFILE_URL: 'https://twitter.com/ice_blockchain',
  TELEGRAM_PROFILE_URL: 'https://t.me/iceblockchain',
  EARLY_ACCESS: 'https://ice.io/early-release-version',
  CHANGELOG: 'https://ice.io/changelog',
  ICE_FAQ: 'https://ice.io/faq',
  STATUS_NOTICE: 'https://ice-production.b-cdn.net/assets/notice.json',
  BETA_TESTING: 'https://ice.io/beta-testing',
  FACEBOOK_PAGE: `fb://profile/${ENV.FACEBOOK_PAGE_ID}`,
  FACEBOOK_WEB_PAGE: 'https://facebook.com/ice.blockchain',
  INSTAGRAM_PAGE: 'instagram://user?username=ice.blockchain',
  INSTAGRAM_WEB_PAGE: 'https://www.instagram.com/ice.blockchain',
  LINKEDIN_PAGE: 'linkedin://company/ice-blockchain',
  LINKEDIN_WEB_PAGE: 'https://linkedin.com/company/ice-blockchain',
  YOUTUBE_PAGE: `vnd.youtube://channel/${ENV.YOUTUBE_CHANNEL_ID}`,
  YOUTUBE_WEB_PAGE: 'https://youtube.com/@ice.blockchain',
  TIKTOK_PAGE: 'https://www.tiktok.com/@ice.blockchain',
};
