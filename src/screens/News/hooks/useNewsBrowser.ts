// SPDX-License-Identifier: ice License 1.0

import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {NewsActions} from '@store/modules/News/actions';
import {openLinkWithInAppBrowser} from '@utils/device';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

type NewsArticleData = {
  id: string;
  url: string;
  viewed: boolean;
  language: string;
};

export function useNewsBrowser(newsArticle: NewsArticleData | undefined) {
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
            language: newsArticle.language,
          }),
        );
      }
    });
    AnalyticsEventLogger.trackOpenArticle({articleName: newsArticle.id});
  }, [newsArticle, dispatch]);

  return {
    openNewsArticle,
  };
}
