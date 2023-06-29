// SPDX-License-Identifier: ice License 1.0

import {getSignInWithEmailLinkStatus} from './getSignInWithEmailLinkStatus';
import {refreshTokens} from './refreshTokens';
import {sendSignInLinkToEmail} from './sendSignInLinkToEmail';

export const auth = Object.freeze({
  getSignInWithEmailLinkStatus,
  sendSignInLinkToEmail,
  refreshTokens,
});
