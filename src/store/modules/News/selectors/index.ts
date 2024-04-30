// SPDX-License-Identifier: ice License 1.0

import {getFeaturedNewsArticle} from './getFeaturedNewsArticle';
import {getNewsArticle} from './getNewsArticle';
import {getNewsByIds} from './getNewsByIds';
import {getNewsIds} from './getNewsIds';
import {getUnreadCount} from './getUnreadCount';
import {hasMoreToLoad} from './hasMoreToLoad';
import {pageNumber} from './pageNumber';

export const NewsSelectors = Object.freeze({
  getFeaturedNewsArticle,
  getNewsArticle,
  getNewsByIds,
  getNewsIds,
  getUnreadCount,
  pageNumber,
  hasMoreToLoad,
});
