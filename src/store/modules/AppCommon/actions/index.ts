// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

export type AppStateType =
  | 'active'
  | 'background'
  | 'inactive'
  | 'unknown'
  | 'extension';

const APP_LOADED = createAction('APP_LOADED', {
  STATE: true,
});

const APP_INITIALIZED = createAction('APP_INITIALIZED', {
  SUCCESS: true,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const APP_STATE_CHANGE = createAction('APP_STATE_CHANGE', {
  STATE: (appState: AppStateType) => ({appState}),
});

const INTERVAL_UPDATE = createAction('INTERVAL_UPDATE', {
  STATE: true,
});

const SET_FIRST_SIGN_IN_TIME = createAction('SET_FIRST_SIGN_IN_TIME', {
  STATE: true,
});

const SET_SHOWED_CREATIVE_LIBRARY = createAction(
  'SET_SHOWED_CREATIVE_LIBRARY',
  {
    STATE: true,
  },
);

const UPDATE_SPLASH_VISIBLE_STATE = createAction(
  'UPDATE_SPLASH_VISIBLE_STATE',
  {
    HIDE: true,
  },
);

export const AppCommonActions = Object.freeze({
  APP_LOADED,
  APP_INITIALIZED,
  APP_STATE_CHANGE,
  INTERVAL_UPDATE,
  UPDATE_SPLASH_VISIBLE_STATE,
  SET_FIRST_SIGN_IN_TIME,
  SET_SHOWED_CREATIVE_LIBRARY,
});
