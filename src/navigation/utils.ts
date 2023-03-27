// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

export let navigationReadyResolver: () => void;
export const navigationReady = new Promise<void>(
  r => (navigationReadyResolver = r),
);

export const navigationRef =
  createNavigationContainerRef<MainNavigationParams>();
type NavigationParams = Parameters<typeof navigationRef.navigate>;

export const getCurrentRoute = async () => {
  await navigationReady;
  return navigationRef.getCurrentRoute();
};

export const getCurrentRouteSync = () => {
  return navigationRef.getCurrentRoute();
};

export const removeScreenByName = async (screenName: string) => {
  await navigationReady;
  const currentStack = navigationRef.getState();
  const screenIndex = currentStack.routes.findIndex(
    route => route.name === screenName,
  );
  if (screenIndex !== -1) {
    const newStack = {
      ...currentStack,
      routes: currentStack.routes.filter(route => route.name !== screenName),
    };
    if (newStack.index >= newStack.routes.length) {
      newStack.index = newStack.routes.length - 1;
    }
    navigationRef.reset(newStack);
  }
};

export const navigate = async (...params: NavigationParams) => {
  await navigationReady;
  return navigationRef.navigate(...params);
};

export const goBack = async () => {
  await navigationReady;
  return navigationRef.goBack();
};

export const resetRoot = async (
  state?: PartialState<NavigationState> | NavigationState,
) => {
  await navigationReady;
  return navigationRef.resetRoot(state);
};
