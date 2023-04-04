// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {SupportedLocale} from '@translations/localeConfig';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  lastUsedLanguage: SupportedLocale | null;
}

type Actions = ReturnType<
  | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  lastUsedLanguage: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AccountActions.GET_ACCOUNT.SUCCESS.type:
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
        if (action.payload.user.language) {
          draft.lastUsedLanguage = action.payload.user.language;
        }
        break;
    }
  });
}

export const languageReducer = persistReducer(
  {
    key: 'language',
    storage: AsyncStorage,
  },
  reducer,
);
