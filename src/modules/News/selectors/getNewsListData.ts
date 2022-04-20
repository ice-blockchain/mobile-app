// SPDX-License-Identifier: BUSL-1.1

import {createSelector} from 'reselect';
import getNewsPostsByIds from './getNewsPostsByIds';

interface NewsPostItem {
  type: 'newsPost';
  id: string;
}

export default createSelector(
  [getNewsPostsByIds],
  (postsByIds): NewsPostItem[] => {
    const result: NewsPostItem[] = [];

    if (postsByIds.length === 0) {
      return result;
    }

    postsByIds.forEach(id => {
      result.push({
        type: 'newsPost',
        id,
      });
    });

    return postsByIds;
  },
);
