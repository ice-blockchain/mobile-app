// SPDX-License-Identifier: ice License 1.0

import {Achievements, RoleType} from '@api/achievements/types';
import {Task} from '@api/tasks/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import produce from 'immer';

interface State {
  level: number;
  roleType: RoleType;
  tasks: Task[];
  items: {
    [userId: string]: Achievements;
  };
}

type Actions = ReturnType<
  | typeof AchievementsActions.LEVELS_AND_ROLES_LOAD.SUCCESS.create
  | typeof AchievementsActions.TASKS_LOAD.SUCCESS.create
  | typeof AchievementsActions.USER_ACHIEVEMENTS_LOAD.SUCCESS.create
  | typeof AchievementsActions.ALL_BADGES_LOAD.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  level: 1,
  roleType: 'snowman',
  tasks: [],
  items: {},
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case AchievementsActions.LEVELS_AND_ROLES_LOAD.SUCCESS.type:
        {
          const {level, roleType} = action.payload;

          draft.level = level;
          draft.roleType = roleType;
        }
        break;

      case AchievementsActions.TASKS_LOAD.SUCCESS.type:
        {
          const {tasks} = action.payload;
          draft.tasks = tasks;
        }
        break;

      case AchievementsActions.USER_ACHIEVEMENTS_LOAD.SUCCESS.type:
      case AchievementsActions.ALL_BADGES_LOAD.SUCCESS.type:
        {
          const {userId, achievements} = action.payload;
          draft.items[userId] = {...state.items[userId], ...achievements};
        }
        break;

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const achievementsReducer = reducer;
