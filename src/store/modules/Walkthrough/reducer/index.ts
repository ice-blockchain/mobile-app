// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {
  WalkthroughElementData,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import produce from 'immer';

export interface WalkthroughState {
  stepElements: {[key in WalkthroughStepKey]?: WalkthroughElementData};
  seenSteps: {[key in WalkthroughStepKey]?: true};
}

type Actions = ReturnType<
  | typeof WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof WalkthroughActions.SET_WALKTHROUGH_STEP_SEEN.STATE.create
  | typeof WalkthroughActions.SKIP_WALKTHROUGH.STATE.create
>;

const INITIAL_STATE: WalkthroughState = {
  stepElements: {},

  /**
   * Get rid of the possible race conditions:
   * E.g.: request to set a step version to the user entity is not completed yet
   * but user already pressed Done -> walkthrough with this step will run again.
   * To handle these cases, in addition to sending the request,
   * we're saving the seen steps locally right away the step is displayed
   */
  seenSteps: {},
};

function reducer(state = INITIAL_STATE, action: Actions): WalkthroughState {
  return produce(state, draft => {
    switch (action.type) {
      case WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.type: {
        const {elementData, stepKey} = action.payload;
        draft.stepElements[stepKey] = elementData;
        break;
      }
      case WalkthroughActions.SET_WALKTHROUGH_STEP_SEEN.STATE.type: {
        if (!state.seenSteps[action.payload.stepKey]) {
          draft.seenSteps = {
            ...state.seenSteps,
            [action.payload.stepKey]: true,
          };
        }
        break;
      }
      case WalkthroughActions.SKIP_WALKTHROUGH.STATE.type: {
        const newSeenSteps = action.payload.stepsKeys.reduce(
          (result, stepKey) => ({...result, [stepKey]: true}),
          {},
        );
        draft.seenSteps = {
          ...state.seenSteps,
          ...newSeenSteps,
        };
        break;
      }
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {...INITIAL_STATE};
      }
    }
  });
}

export const walkthroughReducer = reducer;
