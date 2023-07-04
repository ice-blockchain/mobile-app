// SPDX-License-Identifier: ice License 1.0

import {NewsArticle} from '@api/news/types';
import {NewsActions} from '@store/modules/News/actions';
import produce from 'immer';

export interface State {
  featuredNewsId: string | undefined;

  sortedItemIds: string[];
  items: {
    [newsArticleId: string]: NewsArticle;
  };
  hasMore: boolean;

  pageNumber: number;

  unreadCount: number;
}

const actionCreatorMarkViewed =
  NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).SUCCESS.create;

type Actions =
  | ReturnType<typeof NewsActions.NEWS_LOAD.SUCCESS.create>
  | ReturnType<typeof NewsActions.UNREAD_NEWS_COUNT_LOAD.SUCCESS.create>
  | ReturnType<typeof actionCreatorMarkViewed>;

const INITIAL_STATE: State = {
  featuredNewsId: undefined,

  sortedItemIds: [],
  items: {},
  hasMore: true,
  pageNumber: 0,

  unreadCount: 0,
};

export function newsReducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case NewsActions.NEWS_LOAD.SUCCESS.type:
        {
          const {newsIds, news, hasMore, pageNumber, featuredNewsArticle} =
            action.payload;

          if (pageNumber === 0) {
            draft.sortedItemIds = newsIds;
            draft.items = news;

            if (featuredNewsArticle) {
              draft.featuredNewsId = featuredNewsArticle.id;
              draft.items[featuredNewsArticle.id] = featuredNewsArticle;
            } else {
              draft.featuredNewsId = undefined;
            }
          } else {
            draft.sortedItemIds = [
              ...new Set([...draft.sortedItemIds, ...newsIds]),
            ];

            draft.items = {
              ...draft.items,
              ...news,
            };
          }

          draft.pageNumber = pageNumber;
          draft.hasMore = hasMore;
        }
        break;

      case NewsActions.UNREAD_NEWS_COUNT_LOAD.SUCCESS.type:
        {
          const {count} = action.payload;

          draft.unreadCount = count;
        }
        break;

      case NewsActions.NEWS_ARTICLE_MARK_VIEWED(null).SUCCESS.type:
        {
          const {newsId} = action.payload;
          if (draft.items[newsId]) {
            draft.items[newsId].viewed = true;
          }
        }
        break;
    }
  });
}
