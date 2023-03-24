// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppUpdateActions} from '@store/modules/AppUpdate/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  appVersion: string | null;
}

type Actions = ReturnType<typeof AppUpdateActions.SET_APP_VERSION.STATE.create>;

const INITIAL_STATE: State = {
  appVersion: null,
};

export function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AppUpdateActions.SET_APP_VERSION.STATE.type:
        draft.appVersion = action.payload.version;
        break;
    }
  });
}
export const appUpdateReducer = persistReducer(
  {
    key: 'appVersion',
    storage: AsyncStorage,
  },
  reducer,
);
