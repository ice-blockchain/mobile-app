// SPDX-License-Identifier: ice License 1.0

import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {HOME_WALKTHROUGH_SCREEN_NAME} from '@store/modules/Walkthrough/steps/home';
import {NEWS_WALKTHROUGH_SCREEN_NAME} from '@store/modules/Walkthrough/steps/news';
import {PROFILE_WALKTHROUGH_SCREEN_NAME} from '@store/modules/Walkthrough/steps/profile';
import {TEAM_WALKTHROUGH_SCREEN_NAME} from '@store/modules/Walkthrough/steps/team';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

function navigatedFromWalkthroughScreen({
  newRouteName,
  prevRouteName,
}: {
  newRouteName: string;
  prevRouteName?: string;
}) {
  return (
    newRouteName !== 'Walkthrough' &&
    newRouteName !== 'PopUp' &&
    prevRouteName === 'Walkthrough'
  );
}

function navigatedToWalkthroughScreen({newRouteName}: {newRouteName: string}) {
  return (
    newRouteName === HOME_WALKTHROUGH_SCREEN_NAME ||
    newRouteName === TEAM_WALKTHROUGH_SCREEN_NAME ||
    newRouteName === PROFILE_WALKTHROUGH_SCREEN_NAME ||
    newRouteName === NEWS_WALKTHROUGH_SCREEN_NAME
  );
}

export function useDispatchRestartWalkthrough() {
  const dispatch = useDispatch();

  return useCallback(
    ({
      newRouteName,
      prevRouteName,
    }: {
      newRouteName: string;
      prevRouteName?: string;
    }) => {
      if (
        navigatedFromWalkthroughScreen({newRouteName, prevRouteName}) ||
        navigatedToWalkthroughScreen({newRouteName})
      ) {
        dispatch(WalkthroughActions.RESTART_WALKTHROUGH.STATE.create());
      }
    },
    [dispatch],
  );
}
