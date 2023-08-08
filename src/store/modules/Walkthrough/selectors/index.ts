// SPDX-License-Identifier: ice License 1.0

import {getCurrentRouteSync} from '@navigation/utils';
import {createSelector} from '@reduxjs/toolkit';
import {userSelector} from '@store/modules/Account/selectors';
import {Tab} from '@store/modules/ActiveTab/actions';
import {activeTabSelector} from '@store/modules/ActiveTab/selectors';
import {WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps';
import {
  HOME_WALKTHROUGH_SCREEN_NAME,
  HOME_WALKTHROUGH_STEPS,
} from '@store/modules/Walkthrough/steps/home';
import {
  NEWS_WALKTHROUGH_SCREEN_NAME,
  NEWS_WALKTHROUGH_STEPS,
} from '@store/modules/Walkthrough/steps/news';
import {
  PROFILE_WALKTHROUGH_SCREEN_NAME,
  PROFILE_WALKTHROUGH_STEPS,
} from '@store/modules/Walkthrough/steps/profile';
import {
  TEAM_WALKTHROUGH_SCREEN_NAME,
  TEAM_WALKTHROUGH_STEPS,
} from '@store/modules/Walkthrough/steps/team';
import {
  WalkthroughStep,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {RootState} from '@store/rootReducer';

function getStepsByActiveTabAndScreenName({
  activeTab,
}: {
  activeTab: Tab;
}): WalkthroughStep[] {
  const currentRoute = getCurrentRouteSync();
  const currentScreenName = currentRoute?.name;
  switch (activeTab) {
    case 'home':
      if (currentScreenName === HOME_WALKTHROUGH_SCREEN_NAME) {
        return HOME_WALKTHROUGH_STEPS;
      }
      break;
    case 'team':
      if (currentScreenName === TEAM_WALKTHROUGH_SCREEN_NAME) {
        return TEAM_WALKTHROUGH_STEPS;
      }
      break;
    case 'news':
      if (currentScreenName === NEWS_WALKTHROUGH_SCREEN_NAME) {
        return NEWS_WALKTHROUGH_STEPS;
      }
      break;
    case 'profile':
      if (currentScreenName === PROFILE_WALKTHROUGH_SCREEN_NAME) {
        return PROFILE_WALKTHROUGH_STEPS;
      }
      break;
  }
  return [];
}

export const walkthroughStepCandidatesSelector = createSelector(
  [
    userSelector,
    (state: RootState) => state.walkthrough.stepElements,
    (state: RootState) => state.walkthrough.seenSteps,
    activeTabSelector,
  ],
  (user, stepElements, seenSteps, activeTab) => {
    if (!user) {
      return [];
    }

    return getStepsByActiveTabAndScreenName({
      activeTab,
    }).reduce<WalkthroughStep[]>((result, step) => {
      const stepSeenVersion =
        user.clientData?.walkthroughProgress?.[step.key]?.version ?? 0;
      if (
        step.version > stepSeenVersion &&
        !!stepElements[step.key] &&
        !seenSteps[step.key]
      ) {
        return [
          ...result,
          {
            ...step,
            elementData: stepElements[step.key],
          },
        ];
      }
      return result;
    }, []);
  },
);

export const shouldDisplayStepSelector =
  (stepKey: WalkthroughStepKey) => (state: RootState) => {
    const user = userSelector(state);
    const stepSeenVersion =
      user?.clientData?.walkthroughProgress?.[stepKey]?.version ?? 0;
    const stepLastVersion =
      WALKTHROUGH_STEPS.find(s => s.key === stepKey)?.version ?? 0;

    return stepLastVersion > stepSeenVersion;
  };
