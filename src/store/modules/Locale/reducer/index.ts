// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountActions} from '@store/modules/Account/actions';
import {LanguageActions} from '@store/modules/Locale/actions';
import {SupportedLocale} from '@translations/localeConfig';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  lastUsedInAppLocale: SupportedLocale | undefined;
  lastUsedPhoneLocale: SupportedLocale | undefined;
}

type Actions = ReturnType<
  | typeof AccountActions.GET_ACCOUNT.SUCCESS.create
  | typeof AccountActions.UPDATE_ACCOUNT.SUCCESS.create
  | typeof LanguageActions.UPDATE_LAST_USED_IN_APP_LOCALE.STATE.create
  | typeof LanguageActions.UPDATE_LAST_USED_PHONE_LOCALE.STATE.create
>;

const INITIAL_STATE: State = {
  lastUsedInAppLocale: undefined,
  lastUsedPhoneLocale: undefined,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case LanguageActions.UPDATE_LAST_USED_IN_APP_LOCALE.STATE.type:
        draft.lastUsedInAppLocale = action.payload.lastUsedInAppLocale;
        break;
      case LanguageActions.UPDATE_LAST_USED_PHONE_LOCALE.STATE.type:
        draft.lastUsedPhoneLocale = action.payload.lastUsedPhoneLocale;
        draft.lastUsedInAppLocale = undefined;
        break;
      case AccountActions.GET_ACCOUNT.SUCCESS.type:
      case AccountActions.UPDATE_ACCOUNT.SUCCESS.type:
        if (action.payload.user.language) {
          draft.lastUsedInAppLocale = action.payload.user.language;
        }
        break;
    }
  });
}

export const localeReducer = persistReducer(
  {
    key: 'locale',
    storage: AsyncStorage,
  },
  reducer,
);
