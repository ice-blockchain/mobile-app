// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {CompletedItem} from '@screens/HomeFlow/Home/components/Tasks/components/CompletedItem';
import {ProgressItem} from '@screens/HomeFlow/Home/components/Tasks/components/ProgressItem';
import {
  ITEM_HEIGHT,
  ITEM_LEFT_POSITION,
  TaskItem,
} from '@screens/HomeFlow/Home/components/Tasks/components/TaskItem';
import {useTasks} from '@screens/HomeFlow/Home/components/Tasks/hooks/useTasks';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const Tasks = memo(() => {
  const {
    tasks,
    currentActiveTaskIndex,
    countCompletedItems,
    areAllTasksCompleted,
  } = useTasks();

  const [isExpanded, setIsExpanded] = useState(!areAllTasksCompleted);

  useEffect(() => {
    if (!areAllTasksCompleted) {
      setIsExpanded(true);
    }
  }, [areAllTasksCompleted]);

  const [itemsContainerHeight, setItemsContainerHeight] = useState(0);

  const countCompletedItemsBeforeCurrentActive =
    areAllTasksCompleted && isExpanded
      ? countCompletedItems
      : tasks.findIndex(task => !task.completed) + 1;

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
    tasks.forEach((_task, index) => {
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
        <View style={styles.upcomingTasksLine} />
        <View
          style={[
            styles.finishedTasksLine,
            {
              height:
                ITEM_HEIGHT * (countCompletedItemsBeforeCurrentActive + 0.5),
            },
          ]}
        />

        {areAllTasksCompleted ? (
          <CompletedItem
            onPress={handleCompletedPress}
            isExpanded={isExpanded}
          />
        ) : (
          <ProgressItem completed={countCompletedItems} total={tasks.length} />
        )}

        <Animated.View
          style={[
            styles.itemsContainer,
            !!itemsContainerHeight && itemsContainerStyle,
          ]}
          onLayout={onItemsContainerLayout}>
          {tasks.map((task, index) => {
            const allBeforeCompleted = completedByIndex[index] === index;

            return (
              <TaskItem
                key={task.type}
                task={task}
                active={index === currentActiveTaskIndex}
                isLastItem={index === tasks.length - 1}
                areAllBeforeCompleted={allBeforeCompleted}
              />
            );
          })}
        </Animated.View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(11),
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
  comingSoonContainer: {
    marginTop: rem(16),
    padding: rem(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    marginTop: rem(11),
    ...font(15, 18, 'medium', 'secondary'),
  },
});
