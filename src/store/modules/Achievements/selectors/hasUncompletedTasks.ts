// SPDX-License-Identifier: ice License 1.0

import {createSelector} from '@reduxjs/toolkit';

import {getTasks} from './getTasks';

export const hasUncompletedTasks = createSelector(
  getTasks,
  tasks => tasks?.some(task => !task.completed) ?? false,
);
