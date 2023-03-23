// SPDX-License-Identifier: ice License 1.0

import {createSelector} from '@reduxjs/toolkit';
import {userSelector} from '@store/modules/Account/selectors';
import {Tab} from '@store/modules/ActiveTab/actions';
import {WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps';
import {HOME_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/home';
import {NEWS_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/news';
import {TEAM_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/team';
import {
  WalkthroughStep,
  WalkthroughStepKey,
} from '@store/modules/Walkthrough/types';
import {RootState} from '@store/rootReducer';

function getStepsByActiveTabAndScreenName({
  activeTab,
  currentScreenName,
}: {
  activeTab: Tab;
  currentScreenName: string;
}): WalkthroughStep[] {
  switch (activeTab) {
    case 'home':
      if (currentScreenName === 'Home') {
        return HOME_WALKTHROUGH_STEPS;
      }
      break;
    case 'team':
      if (currentScreenName === 'Team') {
        return TEAM_WALKTHROUGH_STEPS;
      }
      break;
    case 'news':
      if (currentScreenName === 'News') {
        return NEWS_WALKTHROUGH_STEPS;
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
    (state: RootState) => state.activeTab.activeTab,
    (state: RootState) => state.activeTab.currentScreenName,
  ],
  (user, stepElements, seenSteps, activeTab, currentScreenName) => {
    if (!user) {
      return [];
    }

    return getStepsByActiveTabAndScreenName({
      activeTab,
      currentScreenName,
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
