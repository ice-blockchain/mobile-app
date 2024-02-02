// SPDX-License-Identifier: ice License 1.0

import {useRefresh} from '@hooks/useRefresh';
import {USER_GROWTH_STATS_PERIOD} from '@screens/HomeFlow/Home/components/Overview/components/OnlineUsersHistory';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {QuizActions} from '@store/modules/Quiz/actions';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {getIsInitialStartAction} from '@store/modules/Referrals/utils/utils';
import {StatsActions} from '@store/modules/Stats/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {useSelector} from 'react-redux';

const REFRESH_ACTIONS = [
  TokenomicsActions.GET_BALANCE_SUMMARY,
  TokenomicsActions.GET_MINING_SUMMARY,
  TokenomicsActions.GET_PRE_STAKING_SUMMARY,
  TokenomicsActions.GET_RANKING_SUMMARY,
  AccountActions.GET_ACCOUNT,
  StatsActions.GET_ADOPTION,
  ReferralsActions.GET_REFERRALS_HISTORY,
  getIsInitialStartAction('T1'),
  {
    ...StatsActions.GET_USER_GROWTH_STATS,
    START: {
      ...StatsActions.GET_USER_GROWTH_STATS.START,
      create: () =>
        StatsActions.GET_USER_GROWTH_STATS.START.create(
          USER_GROWTH_STATS_PERIOD,
        ),
    },
  },
  AchievementsActions.LEVELS_AND_ROLES_LOAD,
  QuizActions.CHECK_QUIZ_STATUS,
];

export const useHomeRefresh = () => {
  const hasUncompleted: ReturnType<
    typeof AchievementsSelectors.hasUncompletedTasks
  > = useSelector(AchievementsSelectors.hasUncompletedTasks);

  return useRefresh(
    hasUncompleted
      ? [...REFRESH_ACTIONS, AchievementsActions.TASKS_LOAD]
      : REFRESH_ACTIONS,
  );
};
