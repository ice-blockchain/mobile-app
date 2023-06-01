// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmojiHistoryActions} from '@store/modules/EmojiHistory/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

const EMOJI_HISTORY_LIMIT = 8;

export interface State {
  emojiHistory: string[];
}

type Actions = ReturnType<
  typeof EmojiHistoryActions.ADD_EMOJI_TO_HISTORY.STATE.create
>;

const INITIAL_STATE: State = {
  emojiHistory: ['👍', '🔥', '😍', '👎'],
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case EmojiHistoryActions.ADD_EMOJI_TO_HISTORY.STATE.type:
        draft.emojiHistory = [
          ...new Set([action.payload.emoji, ...draft.emojiHistory]),
        ];
        if (draft.emojiHistory.length > EMOJI_HISTORY_LIMIT) {
          draft.emojiHistory = draft.emojiHistory.slice(0, EMOJI_HISTORY_LIMIT);
        }
        break;
    }
  });
}

export const emojiHistoryReducer = persistReducer(
  {
    key: 'emojiHistory',
    storage: AsyncStorage,
    whitelist: ['emojiHistory'],
  },
  reducer,
);
