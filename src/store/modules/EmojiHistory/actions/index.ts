// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const ADD_EMOJI_TO_HISTORY = createAction('ADD_EMOJI_TO_HISTORY', {
  STATE: (payload: {emoji: string}) => payload,
});

export const EmojiHistoryActions = Object.freeze({
  ADD_EMOJI_TO_HISTORY,
});
