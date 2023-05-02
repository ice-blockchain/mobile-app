// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect} from '@react-navigation/native';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useTasks() {
  const dispatch = useDispatch();

  const tasks = useSelector(AchievementsSelectors.getTasks);

  const [currentTasks, setCurrentTasks] = useState(tasks);

  useEffect(() => {
    if (!tasks) {
      dispatch(AchievementsActions.TASKS_LOAD.START.create());
    }
  }, [dispatch, tasks, currentTasks]);

  useFocusEffect(
    useCallback(() => {
      /** Timeout so user can see the change active tasks animation */
      setTimeout(() => {
        setCurrentTasks(tasks);
      }, 1000);
    }, [tasks]),
  );

  const currentActiveTaskIndex = useMemo(() => {
    return currentTasks?.findIndex(task => !task.completed) ?? -1;
  }, [currentTasks]);

  const countCompletedItems = useMemo(() => {
    return currentTasks?.slice(0, currentActiveTaskIndex).length ?? 0;
  }, [currentActiveTaskIndex, currentTasks]);

  const areAllTasksCompleted = useMemo(() => {
    return currentTasks?.every(task => task.completed) ?? false;
  }, [currentTasks]);

  return {
    tasks: currentTasks,
    currentActiveTaskIndex,
    countCompletedItems,
    areAllTasksCompleted,
  };
}
