// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {loadAllBadges} from '@store/modules/Achievements/sagas/loadAllBadgesSaga';
import {loadTasksSaga} from '@store/modules/Achievements/sagas/loadTasksSaga';
import {loadUserAchievements} from '@store/modules/Achievements/sagas/loadUserAchievements';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {takeLatest, takeLeading} from 'redux-saga/effects';

import {completeFollowOnTwitterTaskSaga} from './completeFollowOnTwitterTaskSaga';
import {completeInviteFriendsTaskSaga} from './completeInviteFriendsTaskSaga';
import {completeJoinTelegramTaskSaga} from './completeJoinTelegramTaskSaga';
import {completeStartMiningTaskSaga} from './completeStartMiningTaskSaga';
import {completeUploadProfileTaskSaga} from './completeUploadProfileTaskSaga';
import {loadLevelsAndRolesSaga} from './loadLevelsAndRolesSaga';
import {taskMarkCompletedSaga} from './taskMarkCompletedSaga';

export const achievementsWatchers = [
  takeLatest(
    [
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.APP_INITIALIZED.SUCCESS.type,
      AppCommonActions.INTERVAL_UPDATE.STATE.type,
      AchievementsActions.LEVELS_AND_ROLES_LOAD.START.type,
    ],
    loadLevelsAndRolesSaga,
  ),
  takeLeading(AchievementsActions.TASKS_LOAD.START.type, loadTasksSaga),
  takeLeading(
    AchievementsActions.TASK_MARK_COMPLETED.START.type,
    taskMarkCompletedSaga,
  ),
  takeLeading(
    TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
    completeStartMiningTaskSaga,
  ),
  takeLeading(
    AccountActions.UPDATE_ACCOUNT.SUCCESS.type,
    completeUploadProfileTaskSaga,
  ),
  takeLeading(
    AccountActions.GET_ACCOUNT.SUCCESS.type,
    completeInviteFriendsTaskSaga,
  ),
  takeLeading(
    AchievementsActions.TASK_MARK_COMPLETED.TWITTER.type,
    completeFollowOnTwitterTaskSaga,
  ),
  takeLeading(
    AchievementsActions.TASK_MARK_COMPLETED.TELEGRAM.type,
    completeJoinTelegramTaskSaga,
  ),
  takeLeading(
    AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.type,
    loadUserAchievements,
  ),
  takeLeading(AchievementsActions.ALL_BADGES_LOAD.START.type, loadAllBadges),
];
