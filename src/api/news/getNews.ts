// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';

import {NewsArticle, NewsArticleType} from './types';

type Response = NewsArticle[];

interface QueryParams {
  type: NewsArticleType;
  limit: number;
  offset: number;
  createdAfter?: string;
}

interface Params extends QueryParams {
  language: string;
}

export function getNews({language, ...qParams}: Params) {
  const queryParams: QueryParams = qParams;

  return get<Response>(`/news/${language}`, {
    ...queryParams,
  });
}
