// SPDX-License-Identifier: ice License 1.0

import {NEWS_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/news';
import {TEAM_WALKTHROUGH_STEPS} from '@store/modules/Walkthrough/steps/team';

export const WALKTHROUGH_STEPS = [
  ...TEAM_WALKTHROUGH_STEPS,
  ...NEWS_WALKTHROUGH_STEPS,
];
