// SPDX-License-Identifier: ice License 1.0

import {store} from '@store/configureStore';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {shouldDisplayStepSelector} from '@store/modules/Walkthrough/selectors';
import {
  WalkthroughElementData,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export function useSetWalkthroughElementData() {
  const dispatch = useDispatch();
  const setWalkthroughElementData = useCallback(
    ({
      stepKey,
      elementData,
    }: {
      stepKey: WalkthroughStepKey;
      elementData: WalkthroughElementData;
    }) => {
      if (shouldDisplayStepSelector(stepKey)(store.getState())) {
        dispatch(
          WalkthroughActions.SET_WALKTHROUGH_STEP_ELEMENT_DATA.STATE.create({
            elementData,
            stepKey,
          }),
        );
      }
    },
    [dispatch],
  );

  return {setWalkthroughElementData};
}
