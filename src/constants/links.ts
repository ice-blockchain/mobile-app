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
  TWITTER_APP_URL: 'twitter://user?screen_name=ice_blockchain',
  TWITTER_PROFILE_URL: 'https://twitter.com/ice_blockchain',
  TELEGRAM_PROFILE_URL: 'https://t.me/iceblockchain',
  CHANGELOG: 'https://ice.io/changelog',
  ICE_FAQ: 'https://ice.io/faq',
  ICE_HOMEPAGE: 'https://ice.io',
  BETA_TESTING: 'https://ice.io/beta-testing',
  FACEBOOK_APP: `fb://profile/${ENV.FACEBOOK_PAGE_ID}`,
  FACEBOOK_WEB: 'https://facebook.com/ice.blockchain',
  INSTAGRAM_APP: 'instagram://user?username=ice.blockchain',
  INSTAGRAM_WEB: 'https://www.instagram.com/ice.blockchain',
  LINKEDIN_APP: 'linkedin://company/ice-blockchain',
  LINKEDIN_WEB: 'https://linkedin.com/company/ice-blockchain',
  YOUTUBE_APP: `vnd.youtube://channel/${ENV.YOUTUBE_CHANNEL_ID}`,
  YOUTUBE_WEB: 'https://youtube.com/@ice.blockchain',
  TIKTOK_WEB: 'https://www.tiktok.com/@ice.blockchain',
  APP_UPDATE: 'https://ice.io/app-update',
  GITHUB_WEB: 'https://github.com/ice-blockchain',
};
