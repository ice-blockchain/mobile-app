// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {SocialsActions} from '@store/modules/Socials/actions';
import {SocialsShare} from '@store/modules/Socials/types';
import produce from 'immer';

interface State {
  items: {
    [userId: string]: SocialsShare[];
  };
}

type Actions = ReturnType<
  | typeof SocialsActions.SOCIALS_LOAD.SUCCESS.create
  | typeof SocialsActions.SOCIALS_MARK_SHARED.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  items: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case SocialsActions.SOCIALS_LOAD.SUCCESS.type:
      case SocialsActions.SOCIALS_MARK_SHARED.SUCCESS.type:
        {
          const {userId, socials} = action.payload;
          draft.items[userId] = {...state.items[userId], ...socials};
        }
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const socialsReducer = reducer;
