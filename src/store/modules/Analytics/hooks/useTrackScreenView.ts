// SPDX-License-Identifier: ice License 1.0

import {getCurrentRoute} from '@navigation/utils';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {useCallback, useRef} from 'react';

export function useTrackScreenView() {
  const routeNameRef = useRef<string>();
  return useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = await getCurrentRoute();
    if (currentRoute?.name && previousRouteName !== currentRoute.name) {
      routeNameRef.current = currentRoute.name;
      AnalyticsEventLogger.trackViewScreen({screenName: currentRoute.name});
    }
  }, [routeNameRef]);
}
