// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

export type Tab = 'home' | 'team' | 'news' | 'profile';

const SET_ACTIVE_TAB = createAction('SET_ACTIVE_TAB', {
  STATE: (tab: Tab) => ({tab}),
});

const SET_CURRENT_SCREEN = createAction('SET_CURRENT_SCREEN', {
  STATE: (screenName: string) => ({screenName}),
});

export const ActiveTabActions = Object.freeze({
  SET_ACTIVE_TAB,
  SET_CURRENT_SCREEN,
});
