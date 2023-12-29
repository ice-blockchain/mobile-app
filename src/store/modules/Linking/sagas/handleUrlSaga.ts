// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {navigate} from '@navigation/utils';
import {CATEGORIES} from '@screens/ProfileFlow/Badges';
import {isSignInWithEmailLink, isUpdateEmailLink} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {
  isAppActiveSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {NewsActions} from '@store/modules/News/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
import {openLink, openLinkWithInAppBrowser} from '@utils/device';
import {call, put} from 'redux-saga/effects';

const actionCreator = LinkingActions.HANDLE_URL.STATE.create;

export function* handleUrlSaga(action: ReturnType<typeof actionCreator>) {
  const {url, handledInApp} = action.payload;

  if (isSignInWithEmailLink(url)) {
    yield put(AccountActions.SIGN_IN_EMAIL_LINK.CONFIRM_TEMP_EMAIL.create(url));
    return;
  }

  const {path, parsedUrl, isDeeplink, isUniversalLink} = parseUrl(url);
  const searchParams = parsedUrl.searchParams;

  if (isUpdateEmailLink(parsedUrl)) {
    yield put(
      AccountActions.MODIFY_EMAIL_WITH_LINK.CONFIRM_TEMP_EMAIL.create(url),
    );
    return;
  }

  yield call(waitForSelector, isSplashHiddenSelector);
  yield call(waitForSelector, isAppActiveSelector);

  switch (path.toLowerCase()) {
    case 'creative-ice-library': {
      navigate({name: 'CreativeIceLibrary', params: undefined});
      break;
    }
    case 'browser': {
      const paramsUrl = searchParams.get('url');
      const contentLanguage = searchParams.get('contentLanguage');
      const contentId = searchParams.get('contentId');
      const contentType = searchParams.get('contentType');
      if (paramsUrl) {
        const browserUrl = decodeURIComponent(paramsUrl);
        if (!new URL(browserUrl).protocol) {
          throw new Error(`Invalid url ${browserUrl}`);
        }
        yield call(openLinkWithInAppBrowser, {url: browserUrl});
        if (contentId && contentType === 'news') {
          yield put(
            NewsActions.NEWS_ARTICLE_MARK_VIEWED(contentId).START.create({
              newsId: contentId,
              language: contentLanguage,
            }),
          );
          yield call(AnalyticsEventLogger.trackOpenArticle, {
            articleName: contentId,
          });
        }
      }
      break;
    }
    case 'home': {
      const section = searchParams.get('url');
      switch (section) {
        case 'adoption':
        default:
          navigate({
            name: 'HomeTab',
            params: {screen: 'Home'},
          });
      }
      break;
    }
    case 'pre-staking':
      navigate({name: 'Staking', params: undefined});
      break;
    case 'stats':
      navigate({
        name: 'HomeTab',
        params: {screen: 'Stats'},
      });
      break;
    case 'invite':
      navigate({name: 'InviteShare', params: undefined});
      break;
    case 'team':
      navigate({name: 'TeamTab', params: {screen: 'Team'}});
      break;
    case 'news':
      navigate({name: 'NewsTab', params: undefined});
      break;
    case 'profile':
      const userId = searchParams.get('userId') ?? '';
      const section = searchParams.get('section');
      const category = searchParams.get('category');
      switch (section) {
        case 'roles':
          navigate({name: 'Roles', params: {userId}});
          break;
        case 'badges':
          navigate({
            name: 'Badges',
            params: {
              userId,
              category: CATEGORIES.find(c => c.key === category)?.key,
            },
          });
          break;
        default:
          navigate({
            name: 'UserProfile',
            params: {userId},
          });
      }
      break;
    case 'claim-daily-bonus':
      navigate({
        name: 'HomeTab',
        params: {screen: 'Home'},
      });
      yield put(TokenomicsActions.CLAIM_DAILY_BONUS.STATE.create());
      break;
    case 'bsc-address':
      navigate({
        name: 'BscAddress',
        params: undefined,
      });
      break;
    default:
      if (!handledInApp) {
        if (!isDeeplink && !isUniversalLink) {
          openLink(url);
        } else {
          logError(`Unable to handle deeplink: ${url}`);
        }
      }
  }
}

export const parseUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const isDeeplink = parsedUrl.protocol.includes(ENV.DEEPLINK_SCHEME ?? '');
  const isUniversalLink = parsedUrl.host === ENV.DEEPLINK_DOMAIN;
  const path = isDeeplink
    ? parsedUrl.host
    : parsedUrl.pathname.replace('/', '');
  return {isDeeplink, isUniversalLink, path, parsedUrl};
};
