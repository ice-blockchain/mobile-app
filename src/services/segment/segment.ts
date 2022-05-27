// SPDX-License-Identifier: BUSL-1.1

import {InteractionManager} from 'react-native';
import analytics from '@segment/analytics-react-native';
import Mixpanel from '@segment/analytics-react-native-mixpanel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENV} from 'src/constants/env';
import {PushAction, ShareResourceType} from '@services/segment/types';
import {
  getPageNameAndProperties,
  getShareEventProperties,
} from '@services/segment/utils';
import {Content, StoreState, User} from '@store/types';

const SEGMENT_DEV_KEY = 'HqCDEAupMC9XrnZuKlIgtoMEiUESoexp';

const ALIAS_KEY = 'segment:alias_used';

let hasBeenSetUp = false;

export function setupSegment({user, doAlias}: {user: User; doAlias: boolean}) {
  if (!hasBeenSetUp) {
    hasBeenSetUp = true;
    return analytics
      .setup(ENV.SEGMENT_KEY ?? SEGMENT_DEV_KEY, {
        trackAppLifecycleEvents: true,
        using: [Mixpanel],
      })
      .then(async () => {
        if (user.id && doAlias) {
          const jsonValue = await AsyncStorage.getItem(ALIAS_KEY);
          const aliasCalled =
            jsonValue != null ? !!JSON.parse(jsonValue) : false;
          if (!aliasCalled) {
            await analytics.alias(String(user.id)).catch();
            AsyncStorage.setItem(ALIAS_KEY, 'true');
          }
        }
        analytics.track('Home', {
          'Event Type': 'Page Loaded',
        });
      });
  }
}

export async function trackScreen({
  routName,
  parentRouteName,
  params,
  state,
}: {
  routName: string;
  parentRouteName?: string;
  params: Record<string, unknown>;
  state: StoreState;
}) {
  const {pageName, props} = await getPageNameAndProperties({
    routName,
    parentRouteName,
    params,
    state,
  });
  if (pageName) {
    analytics.track(pageName, {
      'Event Type': 'Page Loaded',
      ...props,
    });
  }
}

export async function trackRegisterSuccess(
  user: User,
  provider: 'Google' | 'Facebook' | 'Apple' | 'Email',
) {
  await setupSegment({
    user,
    doAlias: false,
  });
  return analytics.track('Register', {
    Provider: provider,
  });
}

export async function trackLoginSuccess(
  user: User,
  provider: 'Google' | 'Facebook' | 'Apple' | 'Email',
) {
  await setupSegment({user, doAlias: false});
  analytics.track('Login', {
    Provider: provider,
  });
}

export function trackLogoutSuccess() {
  analytics.track('Logout');
}

export function trackShare({
  resourceType,
  resource,
}: {
  resource: Content;
  resourceType: ShareResourceType;
}) {
  InteractionManager.runAfterInteractions(async () => {
    const newProps = await getShareEventProperties({
      resourceType,
      resource,
    });
    analytics.track('Share', {
      'Event Type': 'Social Reaction',
      Type: resourceType,
      ...newProps,
    });
  });
}

export function trackPushNotification({
  pushAction,
  sentTime,
  data,
}: {
  pushAction: PushAction;
  sentTime?: number;
  data: any;
}) {
  InteractionManager.runAfterInteractions(() => {
    analytics.track(`Push Notification ${pushAction}`, {
      'Sent Time': new Date(sentTime ?? Date.now()).toISOString(),
      Data: data,
    });
  });
}
