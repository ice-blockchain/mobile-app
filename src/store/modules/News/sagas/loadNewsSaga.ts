// SPDX-License-Identifier: BUSL-1.1

import {NewsActions} from '@store/modules/News/actions';
// import NewsSelectors from '../selectors';
// import {NewsPost} from '@store/types';
import {put} from 'redux-saga/effects';

export function* loadNewsSaga() {
  // const {isRefresh} = action.payload;

  //TODO: connecte API
  // const searchQuery: string = yield select(NewsSelectors.getSearchQuery);
  // const newsPostIds: string[] = yield select(
  //   NewsSelectors.getNewsPostsByIds,
  // );

  try {
    // const response: ApiNews = yield Api.news.getNews({
    //   page: isRefresh ? 0 : Math.floor(newsPostIds.length / LIMIT),
    //   searchQuery,
    // });
    // const newsPostsByIds: {
    //   [key: string]: NewsPost;
    // } = {};
    // const response = {};
    // response.news = [];
    // response.hasNextPage = false;
    // response.news.forEach(newsPost => {
    //   newsPostsByIds[newsPost.postId] = newsPost;
    // });
    // yield put(
    //   NewsActions.NEWS_LOAD.SUCCESS.create({
    //     isRefresh,
    //     news: newsPostsByIds,
    //     hasMore: response.hasNextPage,
    //   }),
    // );
  } catch (error) {
    yield put(NewsActions.NEWS_LOAD.FAILED.create((error as Error).message)); //TODO::add util for error typing
  }
}
