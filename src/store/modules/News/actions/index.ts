// SPDX-License-Identifier: BUSL-1.1

import {createAction} from '@store/utils/actions/createAction';
import {NewsPost} from '@store/types';

const NEWS_LOAD = createAction('NEWS_LOAD', {
  START: (payload: {isRefresh: boolean}) => payload,
  SUCCESS: (payload: {
    news: {
      [key: string]: NewsPost;
    };
    hasMore: boolean;
    isRefresh: boolean;
  }) => payload,
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const NEWS_POST_LOAD = createAction(
  'NEWSPOST_LOAD',
  {
    START: (newsPostId: string) => ({
      newsPostId,
    }),
    SUCCESS: ({newsPost}: {newsPost: NewsPost}) => ({
      newsPost,
    }),
    FAILED: (errorMessage: string) => ({
      errorMessage,
    }),
  },
  {
    isMultiInstanceProcess: true,
  },
);

const NewsActions = Object.freeze({
  NEWS_LOAD,
  NEWS_POST_LOAD,
});

export default NewsActions;
