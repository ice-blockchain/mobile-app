// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {navigate} from '@navigation/utils';
import {isSignInWithEmailLink, isUpdateEmailLink} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
import {openLinkWithInAppBrowser} from '@utils/device';
import {Linking} from 'react-native';
import {call, put} from 'redux-saga/effects';
import Url from 'url-parse';

const actionCreator = LinkingActions.HANDLE_URL.STATE.create;

export function* handleUrlSaga(action: ReturnType<typeof actionCreator>) {
  const {url, handledInApp} = action.payload;

  if (isSignInWithEmailLink(url)) {
    yield put(AccountActions.SIGN_IN_EMAIL.CONFIRM_TEMP_EMAIL.create(url));
    return;
  }

  const {path, query, isDeeplink, isUniversalLink} = parseUrl(url);

  if (isUpdateEmailLink(query)) {
    yield put(
      AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.CONFIRM_TEMP_EMAIL.create(url),
    );
    return;
  }

  yield call(waitForSelector, isSplashHiddenSelector);

  switch (path.toLowerCase()) {
    case 'browser':
      if (query.url) {
        const browserUrl = decodeURIComponent(query.url);
        const parsedUrl = new Url(browserUrl);
        if (!parsedUrl.protocol) {
          throw new Error(`Invalid url ${browserUrl}`);
        }
        openLinkWithInAppBrowser({url: browserUrl});
      }
      break;
    case 'home':
      switch (query.section) {
        case 'adoption':
        default:
          navigate({
            name: 'HomeTab',
            params: {screen: 'Home'},
          });
      }
      break;
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
      // TODO: temp profile disabling
      if (false) {
        const userId = query.userId ?? '';
        switch (query.section) {
          case 'roles':
            navigate({name: 'Roles', params: {userId}});
            break;
          case 'badges':
            navigate({name: 'Badges', params: {userId}});
            break;
          default:
            navigate({
              name: 'UserProfile',
              params: {userId},
            });
        }
      }
      break;
    default:
      if (!handledInApp) {
        if (!isDeeplink && !isUniversalLink) {
          Linking.openURL(url).catch(logError);
        } else {
          logError(`Unable to handle deeplink: ${url}`);
        }
      }
  }
}

const parseUrl = (url: string) => {
  const parsed = new Url(url, true);
  const isDeeplink = parsed.protocol.includes(ENV.DEEPLINK_SCHEME ?? '');
  const isUniversalLink = parsed.host === ENV.DEEPLINK_DOMAIN;
  const path = isDeeplink ? parsed.host : parsed.pathname.replace('/', '');
  return {isDeeplink, isUniversalLink, path, ...parsed};
};
