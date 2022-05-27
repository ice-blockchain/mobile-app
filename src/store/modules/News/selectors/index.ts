// SPDX-License-Identifier: BUSL-1.1

import {getSearchQuery} from './getSearchQuery';
import {getNewsPostsByIds} from './getNewsPostsByIds';
import {getNewsListData} from './getNewsListData';
import {hasMoreToLoad} from './hasMoreToLoad';

export const NewsSelectors = Object.freeze({
  getSearchQuery,
  getNewsPostsByIds,
  getNewsListData,
  hasMoreToLoad,
});
