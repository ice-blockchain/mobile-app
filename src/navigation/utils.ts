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
