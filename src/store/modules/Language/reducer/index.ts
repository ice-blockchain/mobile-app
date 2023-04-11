// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {LanguageActions} from '@store/modules/Language/actions';
import {SupportedLocale} from '@translations/localeConfig';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  lastUsedInAppLanguage: SupportedLocale | undefined;
  lastUsedPhoneLanguage: SupportedLocale | undefined;
}

type Actions = ReturnType<
  | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof LanguageActions.UPDATE_LAST_USED_IN_APP_LANGUAGE.STATE.create
  | typeof LanguageActions.UPDATE_LAST_USED_PHONE_LANGUAGE.STATE.create
>;

const INITIAL_STATE: State = {
  lastUsedInAppLanguage: undefined,
  lastUsedPhoneLanguage: undefined,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case LanguageActions.UPDATE_LAST_USED_IN_APP_LANGUAGE.STATE.type:
        draft.lastUsedInAppLanguage = action.payload.lastUsedInAppLanguage;
        break;
      case LanguageActions.UPDATE_LAST_USED_PHONE_LANGUAGE.STATE.type:
        draft.lastUsedPhoneLanguage = action.payload.lastUsedPhoneLanguage;
        draft.lastUsedInAppLanguage = undefined;
        break;
      case AccountActions.GET_ACCOUNT.SUCCESS.type:
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
        if (action.payload.user.language) {
          draft.lastUsedInAppLanguage = action.payload.user.language;
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
