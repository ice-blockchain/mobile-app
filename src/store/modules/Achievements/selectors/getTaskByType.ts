// SPDX-License-Identifier: ice License 1.0

import {TaskType} from '@api/tasks/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store/rootReducer';

import {getTasks} from './getTasks';

interface Options {
  type: TaskType;
}

const selector = createSelector(
  [getTasks, (_state: RootState, {type}: Options) => type],
  (tasks, type) => {
    return tasks?.find(task => task.type === type);
  },
);

export const getTaskByType = (options: Options) => (state: RootState) =>
  selector(state, options);
