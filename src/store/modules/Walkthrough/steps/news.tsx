// SPDX-License-Identifier: ice License 1.0

import {WalkthroughStepStaticData} from '@store/modules/Walkthrough/types';

export type NewsWalkthroughStepKey = 'newsReadMore' | 'releasedNews';

export const NEWS_WALKTHROUGH_SCREEN_NAME = 'News';

export const NEWS_WALKTHROUGH_STEPS: WalkthroughStepStaticData<NewsWalkthroughStepKey>[] =
  [
    {
      key: 'newsReadMore',
      version: 1,
      title: '',
      description: '',
    },
    {
      key: 'releasedNews',
      version: 1,
      title: '',
      description: '',
    },
  ];
