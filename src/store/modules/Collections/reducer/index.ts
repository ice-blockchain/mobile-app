// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  actionsMap,
  CollectionAction,
  CollectionActions,
  CollectionsState,
} from '@store/modules/Collections';
import produce from 'immer';
import {WritableDraft} from 'immer/dist/internal';

export const getInitialCollectionState = <T>(): {
  data: T[];
  hasNext: boolean;
  query: string;
} => ({data: [], query: '', hasNext: true});

export type State = typeof CollectionsState;

type Actions = ReturnType<
  | CollectionAction['SUCCESS']['create']
  | CollectionAction['START']['create']
  | CollectionAction['CLEAR']['create']
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

function reducer(state = CollectionsState, action: Actions): State {
  return produce(state, draft => {
    processCollectionStartAction(action, draft);
    processCollectionSuccessAction(action, draft, state);
    processCollectionClearAction(action, draft);
    if (action.type === AccountActions.SIGN_OUT.SUCCESS.type) {
      return {...CollectionsState};
    }
  });
}

const processCollectionStartAction = (
  action: Actions,
  draft: WritableDraft<State>,
) => {
  const collectionStartAction = Object.values(CollectionActions).find(
    collectionAction => action.type === collectionAction.START.type,
  );
  if (collectionStartAction) {
    const {stateKey} = actionsMap.get(collectionStartAction) ?? {};
    if (stateKey && action.payload) {
      draft[stateKey].query = action.payload.query;
      if (action.payload.offset === 0) {
        draft[stateKey].data = [];
        draft[stateKey].hasNext = true;
      }
    }
  }
};

const processCollectionSuccessAction = (
  action: Actions,
  draft: WritableDraft<State>,
  state: State,
) => {
  const collectionSuccessAction = Object.values(CollectionActions).find(
    collectionAction => action.type === collectionAction.SUCCESS.type,
  );
  if (collectionSuccessAction) {
    const {stateKey} = actionsMap.get(collectionSuccessAction) ?? {};
    if (stateKey) {
      // @ts-ignore
      const {offset, result, hasNext} = action.payload;
      if (offset === 0) {
        draft[stateKey].data = result;
      } else {
        draft[stateKey].data = [...state[stateKey].data, ...result];
      }
      draft[stateKey].hasNext = hasNext;
    }
  }
};

const processCollectionClearAction = (
  action: Actions,
  draft: WritableDraft<State>,
) => {
  const collectionStartAction = Object.values(CollectionActions).find(
    collectionAction => action.type === collectionAction.CLEAR.type,
  );
  if (collectionStartAction) {
    const {stateKey} = actionsMap.get(collectionStartAction) ?? {};
    if (stateKey) {
      // @ts-ignore
      draft[stateKey] = CollectionsState[stateKey];
      draft[stateKey].query = '';
      draft[stateKey].hasNext = false;
    }
  }
};

export const collectionsReducer = reducer;
