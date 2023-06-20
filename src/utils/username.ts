// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {isRTL} from '@translations/i18n';

export const removeInvalidUsernameCharacters = (username: string) => {
  return username.replace(/[^a-zA-Z0-9.]/g, '');
};

export const validateUsername = (username: string) => {
  const validationRegex: RegExp = /^[a-zA-Z0-9.]+$/;
  return validationRegex.test(username);
};

export const buildUsernameLink = (username = '') => `${LINKS.MAIN}@${username}`;

export const getUsernameFromUsernameLink = (usernameLink: string) =>
  usernameLink.match(`${LINKS.MAIN}@(.+)`)?.[1];

export const buildUsernameWithPrefix = (username = '') => {
  if (username.length) {
    return isRTL ? `${username}@` : `@${username}`;
  } else {
    return username;
  }
};
