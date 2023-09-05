// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreativeLibraryActions} from '@store/modules/CreativeLibrary/actions';
import produce from 'immer';
import {persistReducer} from 'redux-persist';

export interface State {
  // Needed to track if creative library screen was shown.
  // We supposed to show it for every app installation on a second open or foreground
  // if passed at least 1h since the first app open and sign-in.
  // Supposed to show it only once for each installation.
  firstSignInTime: number;
  showedCreativeLibrary: boolean;
}

type Actions = ReturnType<
  | typeof CreativeLibraryActions.SET_FIRST_SIGN_IN_TIME.STATE.create
  | typeof CreativeLibraryActions.SET_SHOWED_CREATIVE_LIBRARY.STATE.create
>;

const INITIAL_STATE: State = {
  firstSignInTime: 0,
  showedCreativeLibrary: false,
};

export function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case CreativeLibraryActions.SET_FIRST_SIGN_IN_TIME.STATE.type:
        draft.firstSignInTime = Date.now();
        break;
      case CreativeLibraryActions.SET_SHOWED_CREATIVE_LIBRARY.STATE.type:
        draft.showedCreativeLibrary = true;
        break;
    }
  });
}

export const creativeLibraryReducer = persistReducer(
  {
    key: 'creativeLibrary',
    storage: AsyncStorage,
    whitelist: ['firstSignInTime', 'showedCreativeLibrary'],
  },
  reducer,
);
