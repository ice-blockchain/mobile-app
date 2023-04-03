// SPDX-License-Identifier: ice License 1.0

import {deviceMainLocale} from '@translations/i18n';

/**
 * Is Email Link sign-in flow used instead of Email + Password
 */
export const isEmailLinkSignIn = deviceMainLocale.languageCode !== 'zh';

/**
 * Is enabled:
 *  - Sign-in with phone number
 *  - Link phone number on the Team Screen
 *  - Change phone number on the Personal Information Screen
 */
export const isPhoneNumberEnabled = deviceMainLocale.languageCode !== 'zh';
