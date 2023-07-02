// SPDX-License-Identifier: ice License 1.0

import {deviceMainLocale} from '@translations/i18n';

/**
 * Is sign in with phone number enabled
 */
export const isPhoneNumberAuthEnabled = deviceMainLocale.languageCode !== 'zh';

/**
 * Is sign in with oauth providers enabled
 */
export const isSocialAuthEnabled = deviceMainLocale.languageCode !== 'zh';

/**
 * Is linking phone number on the Team Screen enabled
 */
export const isLinkPhoneNumberEnabled = false;

/**
 * Is changing phone number on the Settings -> Personal Information Screen enabled
 */
export const isChangePhoneNumberEnabled = false;
