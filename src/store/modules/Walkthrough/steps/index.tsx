// SPDX-License-Identifier: ice License 1.0

import {HOME_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/home';
import {NEWS_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/news';
import {PROFILE_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/profile';
import {TEAM_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/team';

export const WALKTHROUGH_STEPS = [
  ...HOME_WALKTHROUGH_STEPS,
  ...TEAM_WALKTHROUGH_STEPS,
  ...NEWS_WALKTHROUGH_STEPS,
  ...PROFILE_WALKTHROUGH_STEPS,
];
