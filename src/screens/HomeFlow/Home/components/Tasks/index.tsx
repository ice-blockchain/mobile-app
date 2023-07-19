// SPDX-License-Identifier: ice License 1.0

import {Task} from '@api/tasks/types';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {CompletedItem} from '@screens/HomeFlow/Home/components/Tasks/components/CompletedItem';
import {ProgressItem} from '@screens/HomeFlow/Home/components/Tasks/components/ProgressItem';
import {
  ITEM_HEIGHT,
  ITEM_LEFT_POSITION,
  TaskItem,
} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {TasksSkeleton} from '@screens/HomeFlow/Home/components/Tasks/components/TasksSkeleton';
import {useTasks} from '@screens/HomeFlow/Home/components/Tasks/hooks/useTasks';
import {t} from '@translations/i18n';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  highlightActiveTask?: boolean;
};

export const Tasks = memo(({highlightActiveTask}: Props) => {
  const {
    tasks,
    currentActiveTaskIndex,
    countCompletedItems,
    areAllTasksCompleted,
  } = useTasks();

  const [currentTasks, setCurrentTasks] = useState<Task[] | null>(null);

  const [isExpanded, setIsExpanded] = useState(!areAllTasksCompleted);

  useEffect(() => {
    if (tasks !== currentTasks) {
      const currentHasUncomplitedTasks =
        currentTasks?.some(task => !task.completed) ?? true;

      const allCompleted = tasks?.every(task => task.completed);

      if (allCompleted && currentHasUncomplitedTasks) {
        setIsExpanded(false);
      }
    }

    setCurrentTasks(tasks);
  }, [currentTasks, tasks]);

  useEffect(() => {
    if (!areAllTasksCompleted) {
      setIsExpanded(true);
    }
  }, [areAllTasksCompleted]);

  const [itemsContainerHeight, setItemsContainerHeight] = useState(0);

  const countCompletedItemsBeforeCurrentActive =
    areAllTasksCompleted && isExpanded
      ? countCompletedItems
      : (tasks?.findIndex(task => !task.completed) ?? -1) + 1;

  const itemsContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isExpanded ? itemsContainerHeight : 0, {
        duration: 500,
      }),
    };
  }, [itemsContainerHeight, isExpanded]);

  const onItemsContainerLayout = (event: LayoutChangeEvent) => {
    setItemsContainerHeight(
      Math.max(itemsContainerHeight, event.nativeEvent.layout.height),
    );
  };

  const handleCompletedPress = () => {
    setIsExpanded(!isExpanded);
  };

  const completedByIndex = useMemo(() => {
    const result = [0];
    tasks?.forEach((_task, index) => {
      if (index === 0) {
        return;
      }
      result[index] = result[index - 1] + (tasks[index - 1].completed ? 1 : 0);
    });
    return result;
  }, [tasks]);

  return (
    <>
      <SectionHeader title={t('home.tasks.achievements')} />
      <View style={styles.container}>
        {tasks ? (
          <>
            {areAllTasksCompleted ? (
              <CompletedItem
                onPress={handleCompletedPress}
                isExpanded={isExpanded}
              />
            ) : (
              <ProgressItem
                completed={countCompletedItems}
                total={tasks.length}
              />
            )}

            <Animated.View
              style={[
                styles.itemsContainer,
                !!itemsContainerHeight && itemsContainerStyle,
              ]}
              onLayout={onItemsContainerLayout}>
              <View style={styles.upcomingTasksLine} />
              <View
                style={[
                  styles.finishedTasksLine,
                  {
                    height:
                      ITEM_HEIGHT *
                      (countCompletedItemsBeforeCurrentActive + 0.5),
                  },
                ]}
              />

              {tasks.map((task, index) => {
                const allBeforeCompleted = completedByIndex[index] === index;
                return (
                  <TaskItem
                    key={task.type}
                    task={task}
                    highlightActiveTask={highlightActiveTask}
                    active={index === currentActiveTaskIndex}
                    areAllBeforeCompleted={allBeforeCompleted}
                  />
                );
              })}
            </Animated.View>
          </>
        ) : (
          <TasksSkeleton />
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(20),
  },
  finishedTasksLine: {
    position: 'absolute',
    top: 0,
    left: ITEM_LEFT_POSITION,
    width: 1,
    backgroundColor: COLORS.shamrock,
  },
  upcomingTasksLine: {
    position: 'absolute',
    top: 0,
    left: ITEM_LEFT_POSITION,
    bottom: ITEM_HEIGHT / 2,
    width: 1,
    backgroundColor: COLORS.heather,
  },
  itemsContainer: {
    overflow: 'hidden',
  },
});
