// SPDX-License-Identifier: ice License 1.0

import {deviceMainLocale} from '@translations/i18n';

/**
 * Is Email Link sign in flow used instead of Email + Password
 */
export const isEmailLinkSignIn = deviceMainLocale.languageCode !== 'zh';

/**
 * Is sign in with phone number enabled
 */
export const isPhoneNumberAuthEnabled = deviceMainLocale.languageCode !== 'zh';

/**
 * Is linking phone number on the Team Screen enabled
 */
export const isLinkPhoneNumberEnabled = false;

/**
 * Is changing phone number on the Settings -> Personal Information Screen enabled
 */
export const isChangePhoneNumberEnabled = false;
