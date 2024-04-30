// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {WalkthroughStepStaticData} from '@store/modules/Walkthrough/types';
import {ClosedPrivacyIcon} from '@svg/ClosedPrivacyIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {rem} from 'rn-units/index';

export type ProfileWalkthroughStepKey = 'profileHiddenData';

export const PROFILE_WALKTHROUGH_SCREEN_NAME = 'MyProfile';

export const PROFILE_WALKTHROUGH_STEPS: WalkthroughStepStaticData<ProfileWalkthroughStepKey>[] =
  [
    {
      key: 'profileHiddenData',
      version: 1,
      Icon: (
        <ClosedPrivacyIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.white}
        />
      ),
      title: t('walkthrough.profile.hidden_data.title'),
      description: t('walkthrough.profile.hidden_data.description'),
    },
  ];
