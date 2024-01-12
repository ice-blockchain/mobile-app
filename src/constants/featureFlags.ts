// SPDX-License-Identifier: ice License 1.0

import {isIOS} from 'rn-units';

/**
 * Is linking phone number on the Team Screen enabled
 */
export const isLinkPhoneNumberEnabled = false;

/**
 * Is changing phone number on the Settings -> Personal Information Screen enabled
 */
export const isChangePhoneNumberEnabled = false;

export const isLiteTeam = isIOS;
export const isLightDesign = isIOS;
