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
  nextOffset: number;
} => ({data: [], query: '', hasNext: true, nextOffset: 0});

export type State = typeof CollectionsState;

type Action = ReturnType<
  | CollectionAction['SUCCESS']['create']
  | CollectionAction['START']['create']
  | CollectionAction['CLEAR']['create']
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

function reducer(state = CollectionsState, action: Action): State {
  return produce(state, draft => {
    processCollectionStartAction(action, draft);
    processCollectionSuccessAction(action, draft, state);
    processCollectionClearAction(action, draft);
    if (action.type === AccountActions.SIGN_OUT.SUCCESS.type) {
      return {...CollectionsState};
    }
  });
}

const getStateKeyForAction = (
  action: Action,
  type: 'START' | 'SUCCESS' | 'CLEAR',
) => {
  const collectionAction = Object.values(CollectionActions).find(
    ca => action.type === ca[type].type,
  );

  if (collectionAction) {
    const {stateKey} = actionsMap.get(collectionAction) ?? {};
    return stateKey;
  }
};

const processCollectionStartAction = (
  action: Action,
  draft: WritableDraft<State>,
) => {
  const stateKey = getStateKeyForAction(action, 'START');
  if (stateKey && action.payload) {
    draft[stateKey].query = action.payload.query;
    const {isInitial} = (
      action as ReturnType<CollectionAction['START']['create']>
    ).payload;
    if (isInitial) {
      draft[stateKey].data = [];
      draft[stateKey].hasNext = true;
    }
  }
};

const processCollectionSuccessAction = (
  action: Action,
  draft: WritableDraft<State>,
  state: State,
) => {
  const stateKey = getStateKeyForAction(action, 'SUCCESS');
  if (stateKey) {
    const {nextOffset, result, hasNext, isInitial} = (
      action as ReturnType<CollectionAction['SUCCESS']['create']>
    ).payload;
    if (isInitial) {
      draft[stateKey].data = result;
    } else {
      draft[stateKey].data = [
        ...state[stateKey].data,
        ...result,
      ] as typeof result;
    }
    draft[stateKey].nextOffset = nextOffset;
    draft[stateKey].hasNext = hasNext;
  }
};

const processCollectionClearAction = <
  T extends ReturnType<typeof getStateKeyForAction>,
>(
  action: Action,
  draft: WritableDraft<State>,
) => {
  const stateKey = getStateKeyForAction(action, 'CLEAR') as T;
  if (stateKey) {
    draft[stateKey] = CollectionsState[stateKey];
    draft[stateKey].query = '';
    draft[stateKey].hasNext = false;
    draft[stateKey].nextOffset = 0;
  }
};

export const collectionsReducer = reducer;
