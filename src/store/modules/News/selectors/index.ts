// SPDX-License-Identifier: BUSL-1.1

import {getNewsListData} from './getNewsListData';
import {getNewsPostsByIds} from './getNewsPostsByIds';
import {getSearchQuery} from './getSearchQuery';
import {hasMoreToLoad} from './hasMoreToLoad';

export const NewsSelectors = Object.freeze({
  getSearchQuery,
  getNewsPostsByIds,
  getNewsListData,
  hasMoreToLoad,
});
