// SPDX-License-Identifier: ice License 1.0

import {NewsArticle} from '@api/news/types';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {NewsActions} from '@store/modules/News/actions';
import {openLinkWithInAppBrowser} from '@utils/device';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useNewsBrowser(newsArticle: NewsArticle | undefined) {
  const dispatch = useDispatch();

  const openNewsArticle = useCallback(() => {
    if (!newsArticle) {
      return;
    }

    openLinkWithInAppBrowser({
      url: newsArticle.url,
    }).then(() => {
      if (!newsArticle.viewed) {
        dispatch(
          NewsActions.NEWS_ARTICLE_MARK_VIEWED(newsArticle.id).START.create({
            newsId: newsArticle.id,
          }),
        );
      }
    });
    AnalyticsEventLogger.trackOpenArticle({articleName: newsArticle.title});
  }, [newsArticle, dispatch]);

  return {
    openNewsArticle,
  };
}
