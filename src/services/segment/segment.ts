// SPDX-License-Identifier: BUSL-1.1

import {createClient, JsonValue} from '@segment/analytics-react-native';
import {PushAction} from '@services/segment/types';
import {getPageNameAndProperties} from '@services/segment/utils';
import {InteractionManager} from 'react-native';

const segmentClient = createClient({
  writeKey: '',
});

export function setupSegment() {
  // TODO::create client
}

export async function trackScreen({
  routName,
  parentRouteName,
  params,
}: {
  routName: string;
  parentRouteName?: string;
  params: Record<string, unknown>;
}) {
  const {pageName, props} = await getPageNameAndProperties({
    routName,
    parentRouteName,
    params,
  });
  if (pageName) {
    segmentClient.track(pageName, {
      'Event Type': 'Page Loaded',
      ...props,
    });
  }
}

export function trackPushNotification({
  pushAction,
  sentTime,
  data,
}: {
  pushAction: PushAction;
  sentTime?: number;
  data: JsonValue;
}) {
  InteractionManager.runAfterInteractions(() => {
    segmentClient.track(`Push Notification ${pushAction}`, {
      'Sent Time': new Date(sentTime ?? Date.now()).toISOString(),
      Data: data,
    });
  });
}
