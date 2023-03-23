// SPDX-License-Identifier: ice License 1.0

import {getNews} from './getNews';
import {getUnreadNewsCount} from './getUnreadNewsCount';
import {markViewed} from './markViewed';

export const news = Object.freeze({
  getNews,
  getUnreadNewsCount,
  markViewed,
});
