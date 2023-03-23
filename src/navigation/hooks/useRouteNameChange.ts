// SPDX-License-Identifier: ice License 1.0

import {getCurrentRoute} from '@navigation/utils';
import {useCallback, useRef} from 'react';

type Props = {
  onRouteChange?: (newRouteName: string) => void;
};

export function useRouteNameChange({onRouteChange}: Props) {
  const routeNameRef = useRef<string>();

  return useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = await getCurrentRoute();
    if (currentRoute?.name && previousRouteName !== currentRoute.name) {
      routeNameRef.current = currentRoute.name;
      if (onRouteChange) {
        onRouteChange(routeNameRef.current);
      }
    }
  }, [onRouteChange]);
}
