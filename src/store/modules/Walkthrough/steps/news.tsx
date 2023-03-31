// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {WalkthroughStepStaticData} from '@store/modules/Walkthrough/types';
import {EyeIcon} from '@svg/EyeIcon';
import {NewsIcon} from '@svg/NewsIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units/index';

export type NewsWalkthroughStepKey = 'newsReadMore' | 'releasedNews';

export const NEWS_WALKTHROUGH_SCREEN_NAME = 'NewsTab';

export const NEWS_WALKTHROUGH_STEPS: WalkthroughStepStaticData<NewsWalkthroughStepKey>[] =
  [
    {
      key: 'newsReadMore',
      version: 1,
      Icon: <EyeIcon width={rem(24)} height={rem(24)} fill={COLORS.white} />,
      title: t('walkthrough.news.readmore.title'),
      description: t('walkthrough.news.readmore.description'),
    },
    {
      key: 'releasedNews',
      version: 1,
      Icon: <NewsIcon width={rem(24)} height={rem(24)} color={COLORS.white} />,
      title: t('walkthrough.news.releasednews.title'),
      description: t('walkthrough.news.releasednews.description'),
    },
  ];
