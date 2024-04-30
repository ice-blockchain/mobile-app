// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {navigate} from '@navigation/utils';
import {WalkthroughStepStaticData} from '@store/modules/Walkthrough/types';
import {ChatBubblesIcon} from '@svg/ChatBubblesIcon';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {EngagementCardIcon} from '@svg/EngagementCardIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {HistoryIcon} from '@svg/HistoryIcon';
import {HomeActiveIcon} from '@svg/HomeActiveIcon';
import {InviteIcon} from '@svg/InviteIcon';
import {LampActiveIcon} from '@svg/LampActiveIcon';
import {MiningActiveIcon} from '@svg/MiningActiveIcon';
import {PersonIcon} from '@svg/PersonIcon';
import {PioneerIcon} from '@svg/PioneerIcon';
import {StatsIcon} from '@svg/StatsIcon';
import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {TrophyIcon} from '@svg/TrophyIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {isRTL, t} from '@translations/i18n';
import React from 'react';
import {delay} from 'redux-saga/effects';
import {isAndroid, rem} from 'rn-units';

export type HomeWalkthroughStepKey =
  | 'home'
  | 'inviteFriends'
  | 'team'
  | 'news'
  | 'profile'
  | 'earningIceStart'
  | 'earningIceSeeMore'
  | 'stats'
  | 'help'
  | 'preStaking'
  | 'walletCard'
  | 'earningCard'
  | 'engagementCard'
  | 'profileCard'
  | 'referralsCard'
  | 'adoptionCard'
  | 'nickname'
  | 'balanceHistory'
  | 'achievements';

export const HOME_WALKTHROUGH_SCREEN_NAME = 'Home';

const DELAY = 500;

export const HOME_WALKTHROUGH_STEPS: WalkthroughStepStaticData<HomeWalkthroughStepKey>[] =
  [
    {
      key: 'home',
      version: 1,
      Icon: (
        <HomeActiveIcon color={COLORS.white} width={rem(36)} height={rem(36)} />
      ),
      title: t('walkthrough.home.home.title'),
      description: t('walkthrough.home.home.description'),
    },
    {
      key: 'inviteFriends',
      version: 1,
      Icon: <InviteIcon fill={COLORS.white} width={rem(36)} height={rem(36)} />,
      title: t('walkthrough.home.invite.title'),
      description: t(
        isLiteTeam
          ? 'override.walkthrough.home.invite.description'
          : 'walkthrough.home.invite.description',
      ),
    },
    {
      key: 'team',
      version: 1,
      Icon: (
        <TeamActiveIcon color={COLORS.white} width={rem(36)} height={rem(36)} />
      ),
      title: t('walkthrough.home.team.title'),
      description: t(
        isLiteTeam
          ? 'walkthrough.overrides.home.team.description'
          : 'walkthrough.home.team.description',
      ),
    },
    {
      key: 'earningIceStart',
      version: 1,
      Icon: (
        <MiningActiveIcon
          color={COLORS.white}
          width={rem(28)}
          height={rem(28)}
        />
      ),
      title: t('walkthrough.home.earningicestart.title'),
      description: t('walkthrough.home.earningicestart.description'),
    },
    {
      key: 'earningIceSeeMore',
      version: 1,
      Icon: (
        <MiningActiveIcon
          color={COLORS.white}
          width={rem(28)}
          height={rem(28)}
        />
      ),
      title: t('walkthrough.home.earningiceseemore.title'),
      description: t('walkthrough.home.earningiceseemore.description'),
    },
    {
      key: 'news',
      version: 1,
      Icon: (
        <LampActiveIcon color={COLORS.white} width={rem(36)} height={rem(36)} />
      ),
      title: t('walkthrough.home.news.title'),
      description: t('walkthrough.home.news.description'),
    },
    {
      key: 'profile',
      version: 1,
      Icon: (
        <PersonIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t('walkthrough.home.profile.title'),
      description: t('walkthrough.home.profile.description'),
    },
    {
      key: 'nickname',
      version: 1,
      Icon: (
        <PersonIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t('walkthrough.home.nickname.title'),
      description: t('walkthrough.home.nickname.description'),
    },
    {
      key: 'stats',
      version: 1,
      Icon: <StatsIcon color={COLORS.white} width={rem(28)} height={rem(28)} />,
      title: t('walkthrough.home.stats.title'),
      description: t('walkthrough.home.stats.description'),
    },
    {
      key: 'help',
      version: 1,
      Icon: (
        <ChatBubblesIcon
          color={COLORS.white}
          width={rem(28)}
          height={rem(28)}
        />
      ),
      title: t('walkthrough.home.help.title'),
      description: t('walkthrough.home.help.description'),
    },
    {
      key: 'preStaking',
      version: 1,
      Icon: (
        <CoinsStackIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t('walkthrough.home.preStaking.title'),
      description: t('walkthrough.home.preStaking.description'),
    },
    {
      key: 'walletCard',
      version: 1,
      Icon: (
        <WalletIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t('walkthrough.home.wallet.title'),
      description: isLiteTeam
        ? t('override.walkthrough.home.wallet.description')
        : t('walkthrough.home.wallet.description'),
      before: function* () {
        yield navigate({
          name: 'Home',
          params: {activePagerCard: 'wallet'},
        });
        yield delay(DELAY);
      },
    },
    {
      key: 'earningCard',
      version: 1,
      Icon: (
        <MiningActiveIcon
          color={COLORS.white}
          width={rem(28)}
          height={rem(28)}
        />
      ),
      title: t('walkthrough.home.earning.title'),
      description: isLiteTeam
        ? t('override.walkthrough.home.earning.description')
        : t('walkthrough.home.earning.description'),
      before: function* () {
        yield navigate({name: 'Home', params: {activePagerCard: 'earning'}});
        yield delay(DELAY);
      },
    },
    {
      key: 'engagementCard',
      version: 1,
      Icon: (
        <EngagementCardIcon
          color={COLORS.white}
          width={rem(24)}
          height={rem(24)}
        />
      ),
      title: t('walkthrough.home.engagement.title'),
      description: t('walkthrough.home.engagement.description'),
      before: function* () {
        yield navigate({name: 'Home', params: {activePagerCard: 'engagement'}});
        yield delay(DELAY);
      },
    },
    {
      key: 'balanceHistory',
      version: 1,
      Icon: (
        <HistoryIcon color={COLORS.white} width={rem(28)} height={rem(28)} />
      ),
      title: t('walkthrough.home.balancehistory.title'),
      description: t('walkthrough.home.balancehistory.description'),
      before: function* () {
        yield navigate({name: 'Home', params: {activePagerCard: 'wallet'}});
        yield delay(DELAY);
      },
    },
    {
      key: 'profileCard',
      version: 1,
      Icon: (
        <PioneerIcon color={COLORS.white} width={rem(28)} height={rem(28)} />
      ),
      title: t('walkthrough.home.profilecard.title'),
      description: t('walkthrough.home.profilecard.description'),
      before: function* () {
        yield navigate({
          name: 'Home',
          params: {
            activeOverviewCard: isAndroid && isRTL ? 'adoption' : 'profile',
            scrollTo: 'overview',
          },
        });
        yield delay(DELAY);
      },
    },
    {
      key: 'referralsCard',
      version: 1,
      Icon: (
        <TrophyIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t(
        isLiteTeam
          ? 'walkthrough.overrides.home.referralscard.title'
          : 'walkthrough.home.referralscard.title',
      ),
      description: t(
        isLiteTeam
          ? 'walkthrough.overrides.home.referralscard.description'
          : 'walkthrough.home.referralscard.description',
      ),
      before: function* () {
        yield navigate({
          name: 'Home',
          params: {activeOverviewCard: 'referral', scrollTo: 'overview'},
        });
        yield delay(DELAY);
      },
    },
    {
      key: 'adoptionCard',
      version: 1,
      Icon: <GraphIcon color={COLORS.white} width={rem(24)} height={rem(24)} />,
      title: t('walkthrough.home.adoptioncard.title'),
      description: t('walkthrough.home.adoptioncard.description'),
      before: function* () {
        yield navigate({
          name: 'Home',
          params: {
            activeOverviewCard: isAndroid && isRTL ? 'profile' : 'adoption',
            scrollTo: 'overview',
          },
        });
        yield delay(DELAY);
      },
    },
    {
      key: 'achievements',
      version: 1,
      Icon: (
        <TrophyIcon color={COLORS.white} width={rem(24)} height={rem(24)} />
      ),
      title: t('walkthrough.home.achievements.title'),
      description: t('walkthrough.home.achievements.description'),
      before: function* () {
        yield navigate({
          name: 'Home',
          params: {scrollTo: 'overview'},
        });
        yield delay(DELAY);
      },
    },
  ];
