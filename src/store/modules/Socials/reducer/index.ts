// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SocialsActions} from '@store/modules/Socials/actions';
import {SocialsShare} from '@store/modules/Socials/types';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

interface State {
  items: {
    [userId: string]: SocialsShare[];
  };
}

type Actions = ReturnType<typeof SocialsActions.SET_SOCIALS.STATE.create>;

const INITIAL_STATE: State = {
  items: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case SocialsActions.SET_SOCIALS.STATE.type:
        {
          const {userId, socials} = action.payload;
          draft.items[userId] = socials;
        }
        break;
    }
  });
}

export const socialsReducer = persistReducer(
  {
    key: 'socials',
    storage: AsyncStorage,
    whitelist: ['items'],
  },
  reducer,
);
