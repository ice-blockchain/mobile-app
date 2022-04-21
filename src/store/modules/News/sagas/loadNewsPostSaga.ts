// SPDX-License-Identifier: BUSL-1.1

import {put} from 'redux-saga/effects';
// TODO: connect API
// import Api from 'src/api';
// import {NewsPost} from 'src/types/store';
import NewsActions from '../actions';

const actionCreator = NewsActions.NEWS_POST_LOAD(null).START.create;

export default function* loadNsewsPostSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {postId} = action.payload;
  try {
    // const response: NewsPost = yield Api.news.getNewsPost(postId);
    const response = {};
    yield put(
      NewsActions.NEWS_POST_LOAD(action.id).SUCCESS.create({
        newsPost: response,
      }),
    );
  } catch (error) {
    yield put(
      NewsActions.NEWS_POST_LOAD(action.id).FAILED.create(error.message),
    );
  }
}
