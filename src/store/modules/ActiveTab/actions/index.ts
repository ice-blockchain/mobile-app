// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

export type Tab = 'home' | 'team' | 'chat' | 'profile';
export type ChatTab = 'messages' | 'explore';

const SET_ACTIVE_TAB = createAction('SET_ACTIVE_TAB', {
  STATE: (tab: Tab) => ({tab}),
});

const SET_ACTIVE_CHAT_TAB = createAction('SET_ACTIVE_CHAT_TAB', {
  STATE: (tab: ChatTab) => ({tab}),
});

export const ActiveTabActions = Object.freeze({
  SET_ACTIVE_TAB,
  SET_ACTIVE_CHAT_TAB,
});
