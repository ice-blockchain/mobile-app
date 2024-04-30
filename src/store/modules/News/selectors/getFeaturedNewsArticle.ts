// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const getFeaturedNewsArticle = (state: RootState) => {
  const newsId = rootSelector(state).featuredNewsId;

  return newsId ? rootSelector(state).items[newsId] : undefined;
};
