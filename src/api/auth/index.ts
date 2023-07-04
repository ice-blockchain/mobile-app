// SPDX-License-Identifier: ice License 1.0

import {getConfig} from './getConfig';
import {getConfirmationStatus} from './getConfirmationStatus';
import {getMetadata} from './getMetadata';
import {refreshTokens} from './refreshTokens';
import {sendSignInLinkToEmail} from './sendSignInLinkToEmail';

export const auth = Object.freeze({
  getConfirmationStatus,
  sendSignInLinkToEmail,
  refreshTokens,
  getConfig,
  getMetadata,
});
