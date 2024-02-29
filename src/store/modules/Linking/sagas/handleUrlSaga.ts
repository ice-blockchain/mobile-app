// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {logError} from '@services/logging';
import {
  isAppActiveSelector,
  isSplashHiddenSelector,
} from '@store/modules/AppCommon/selectors';
import {LinkingActions} from '@store/modules/Linking/actions';
import {waitForSelector} from '@store/utils/sagas/effects';
import {openLink, openLinkWithInAppBrowser} from '@utils/device';
import {call} from 'redux-saga/effects';

const actionCreator = LinkingActions.HANDLE_URL.STATE.create;

export function* handleUrlSaga(action: ReturnType<typeof actionCreator>) {
  const {url, handledInApp} = action.payload;

  const {path, parsedUrl, isDeeplink, isUniversalLink} = parseUrl(url);
  const searchParams = parsedUrl.searchParams;

  yield call(waitForSelector, isSplashHiddenSelector);
  yield call(waitForSelector, isAppActiveSelector);

  switch (path.toLowerCase()) {
    case 'browser': {
      const paramsUrl = searchParams.get('url');
      if (paramsUrl) {
        const browserUrl = decodeURIComponent(paramsUrl);
        if (!new URL(browserUrl).protocol) {
          throw new Error(`Invalid url ${browserUrl}`);
        }
        yield call(openLinkWithInAppBrowser, {url: browserUrl});
      }
      break;
    }
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
