// SPDX-License-Identifier: ice License 1.0

import {get} from '@api/client';

interface Response {
  count: number;
}

interface QueryParams {
  createdAfter?: string;
}

interface Params extends QueryParams {
  language: string;
}

export function getUnreadNewsCount({language, ...qParams}: Params) {
  return get<Response>(`/unread-news-count/${language}`, {
    ...qParams,
  });
}
