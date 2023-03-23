// SPDX-License-Identifier: ice License 1.0

import {RoleType} from '@api/achievements/types';
import {Task} from '@api/tasks/types';
import {AccountActions} from '@store/modules/Account/actions';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import produce from 'immer';

interface State {
  level: number;
  roleType: RoleType;
  tasks: Task[];
}

type Actions = ReturnType<
  | typeof AchievementsActions.LEVELS_AND_ROLES_LOAD.SUCCESS.create
  | typeof AchievementsActions.TASKS_LOAD.SUCCESS.create
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
>;

const INITIAL_STATE: State = {
  level: 1,
  roleType: 'snowman',
  tasks: [],
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

      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const achievementsReducer = reducer;
