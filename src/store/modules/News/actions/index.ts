// SPDX-License-Identifier: ice License 1.0

import {NewsArticle} from '@api/news/types';
import {createAction} from '@store/utils/actions/createAction';

const NEWS_LOAD = createAction('NEWS/NEWS_LOAD', {
  START: (payload: {isInitial: boolean}) => payload,
  SUCCESS: (payload: {
    featuredNewsArticle: NewsArticle | undefined;
    newsIds: string[];
    news: {
      [newsArticleId: string]: NewsArticle;
    };
    hasMore: boolean;
    pageNumber: number;
  }) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const UNREAD_NEWS_COUNT_LOAD = createAction('NEWS/UNREAD_NEWS_COUNT_LOAD', {
  START: true,
  SUCCESS: (payload: {count: number}) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const NEWS_ARTICLE_MARK_VIEWED = createAction(
  'NEWS/NEWS_ARTICLE_MARK_VIEWED',
  {
    START: (payload: {newsId: string; language?: string | null}) => payload,
    SUCCESS: (payload: {newsId: string}) => payload,
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
  {
    isMultiInstanceProcess: true,
  },
);

export const NewsActions = Object.freeze({
  NEWS_LOAD,
  UNREAD_NEWS_COUNT_LOAD,
  NEWS_ARTICLE_MARK_VIEWED,
});
