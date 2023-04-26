// SPDX-License-Identifier: ice License 1.0

import {Task} from '@api/tasks/types';
import {useFocusEffect} from '@react-navigation/native';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useTasks() {
  const dispatch = useDispatch();

  const [currentTasks, setCurrentTasks] = useState<Task[] | null>([]);

  const tasks: ReturnType<typeof AchievementsSelectors.getTasks> = useSelector(
    AchievementsSelectors.getTasks,
  );

  useEffect(() => {
    if (!tasks) {
      dispatch(AchievementsActions.TASKS_LOAD.START.create());
    } else if (!currentTasks && tasks.length > 0) {
      setCurrentTasks(tasks);
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
