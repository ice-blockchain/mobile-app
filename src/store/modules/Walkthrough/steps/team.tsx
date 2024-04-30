// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {LINKS} from '@constants/links';
import {navigate} from '@navigation/utils';
import {WalkthroughStepStaticData} from '@store/modules/Walkthrough/types';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {CheckMarkFramedIcon} from '@svg/CheckMarkFramedIcon';
import {ContactsIcon} from '@svg/ContactsIcon';
import {PingIcon} from '@svg/PingIcon';
import {SonarIcon} from '@svg/SonarIcon';
import {TeamIcon} from '@svg/TeamIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {delay} from 'redux-saga/effects';
import {rem} from 'rn-units';

export type TeamWalkthroughStepKey =
  | 'allowContacts'
  | 'confirmPhone'
  | 'contactsList'
  | 'referrals'
  | 'earnings'
  | 'segmentedControlTierOne'
  | 'segmentedControlTierTwo'
  | 'activeUsers'
  | 'tierOneEarnings'
  | 'ping';

export const TEAM_WALKTHROUGH_SCREEN_NAME = 'Team';

export const TEAM_WALKTHROUGH_STEPS: WalkthroughStepStaticData<TeamWalkthroughStepKey>[] =
  [
    {
      key: 'allowContacts',
      version: 1,
      Icon: <AddressBookIcon />,
      title: t('walkthrough.team.allow_contacts.title'),
      description: t('walkthrough.team.allow_contacts.description'),
    },
    {
      key: 'confirmPhone',
      version: 1,
      Icon: <CheckMarkFramedIcon />,
      title: t('walkthrough.team.confirm_phone.title'),
      description: t('walkthrough.team.confirm_phone.description'),
    },
    {
      key: 'contactsList',
      version: 1,
      Icon: <ContactsIcon height={rem(24)} width={rem(24)} />,
      title: t('walkthrough.team.contacts_list.title'),
      description: t('walkthrough.team.contacts_list.description'),
      circlePosition: 'bottom',
      zIndex: 1,
      before: function* () {
        yield navigate({name: 'Team', params: {snapPoint: 1}});
        yield delay(500);
      },
      after: function* () {
        yield navigate({name: 'Team', params: {snapPoint: 0}});
        yield delay(500);
      },
    },
    {
      key: 'referrals',
      version: 1,
      Icon: <TeamIcon width={rem(26)} height={rem(26)} />,
      title: t('walkthrough.team.referrals.title'),
      description: t(
        isLiteTeam
          ? 'override.walkthrough.team.referrals.description'
          : 'walkthrough.team.referrals.description',
      ),
      link: 'https://ice.io/#invite',
    },
    {
      key: 'earnings',
      version: 1,
      Icon: <WalletIcon width={rem(24)} height={rem(24)} />,
      title: t('walkthrough.team.earnings.title'),
      description: t(
        isLiteTeam
          ? 'override.walkthrough.team.earnings.description'
          : 'walkthrough.team.earnings.description',
      ),
    },
    {
      key: 'segmentedControlTierOne',
      version: 1,
      Icon: isLiteTeam ? (
        <TierTwoIcon width={rem(32)} height={rem(32)} />
      ) : (
        <TierOneIcon width={rem(32)} height={rem(32)} />
      ),
      title: t(
        isLiteTeam
          ? 'walkthrough.overrides.team.segmented_control_tier_one.title'
          : 'walkthrough.team.segmented_control_tier_one.title',
      ),
      description: t(
        isLiteTeam
          ? 'walkthrough.overrides.team.segmented_control_tier_one.description'
          : 'walkthrough.team.segmented_control_tier_one.description',
      ),
      link: LINKS.TEAM,
    },
    {
      key: 'segmentedControlTierTwo',
      version: 1,
      Icon: <TierTwoIcon width={rem(32)} height={rem(32)} />,
      title: t('walkthrough.team.segmented_control_tier_two.title'),
      description: t('walkthrough.team.segmented_control_tier_two.description'),
      link: LINKS.TEAM,
    },
    {
      key: 'activeUsers',
      version: 1,
      Icon: <SonarIcon />,
      title: t('walkthrough.team.active_users.title'),
      description: t(
        isLiteTeam
          ? 'walkthrough.overrides.team.active_users.description'
          : 'walkthrough.team.active_users.description',
      ),
    },
    {
      key: 'tierOneEarnings',
      version: 1,
      Icon: <TierOneIcon width={rem(32)} height={rem(32)} />,
      title: t('walkthrough.team.tier_one_earnings.title'),
      description: t('walkthrough.team.tier_one_earnings.description'),
    },
    {
      key: 'ping',
      version: 1,
      Icon: <PingIcon color={COLORS.white} height={rem(21)} width={rem(18)} />,
      title: t('walkthrough.team.ping.title'),
      description: t(
        isLiteTeam
          ? 'walkthrough.overrides.team.ping.description'
          : 'walkthrough.team.ping.description',
      ),
    },
  ];
