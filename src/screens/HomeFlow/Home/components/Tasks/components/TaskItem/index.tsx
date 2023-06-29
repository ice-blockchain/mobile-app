// SPDX-License-Identifier: ice License 1.0

import {Task, TaskType} from '@api/tasks/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useTaskItem} from '@screens/HomeFlow/Home/components/Tasks/hooks/useTaskItem';
import {TASKS} from '@screens/HomeFlow/Home/components/Tasks/tasks';
import {LockIcon} from '@svg/LockIcon';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {TaskNotCompletedSvg} from '@svg/TaskNotCompleted';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const STEP_ICON_SIZE = rem(36);
const LOCK_ICON_SIZE = rem(17);
const ICON_VERTICAL_OFFSET = rem(11);
const ITEM_HORIZONTAL_MARGIN = rem(16);
const ITEM_HORIZONTAL_PADDING = SCREEN_SIDE_OFFSET;
const BULLET_POINT_ICON_SIZE = rem(20);

export const ITEM_LEFT_POSITION =
  ITEM_HORIZONTAL_MARGIN + ITEM_HORIZONTAL_PADDING + BULLET_POINT_ICON_SIZE / 2;
export const ITEM_HEIGHT = STEP_ICON_SIZE + ICON_VERTICAL_OFFSET * 2;

interface TaskIconProps {
  type: TaskType;
}

const TaskIcon = memo(({type}: TaskIconProps) => {
  return TASKS[type].icon;
});

export const TaskItem = ({
  task,
  active,
  areAllBeforeCompleted,
  highlightActiveTask,
}: {
  task: Task;
  active: boolean;
  areAllBeforeCompleted: boolean;
  highlightActiveTask?: boolean;
}) => {
  const {iconBgColor, activeBgColor, title, description, onPress} = useTaskItem(
    task.type,
  );

  const isLocked = (!task.completed || !areAllBeforeCompleted) && !active;

  const activeIconBgStyle =
    activeBgColor && active
      ? {backgroundColor: activeBgColor}
      : {backgroundColor: iconBgColor};

  return (
    <Touchable
      style={[
        styles.container,
        active && styles.containerActive,
        active && highlightActiveTask && styles.activeHighlighted,
        active && commonStyles.shadow,
        task.type === 'invite_friends' && styles.inviteActive,
      ]}
      disabled={!active}
      onPress={onPress}>
      {task.completed && areAllBeforeCompleted ? (
        <TaskCompletedSvg
          fill={COLORS.shamrock}
          width={BULLET_POINT_ICON_SIZE}
          height={BULLET_POINT_ICON_SIZE}
        />
      ) : (
        <TaskNotCompletedSvg
          fill={isLocked ? COLORS.heather : COLORS.shamrock}
          stroke={isLocked ? COLORS.heather : COLORS.shamrock}
          width={BULLET_POINT_ICON_SIZE}
          height={BULLET_POINT_ICON_SIZE}
        />
      )}
      <View style={[styles.iconContainer, activeIconBgStyle]}>
        <TaskIcon type={task.type} />
        {isLocked && (
          <View style={styles.lockIcon}>
            <LockIcon />
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, active && styles.titleActive]}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {isLocked ? (
        <View style={[StyleSheet.absoluteFill, styles.containerInactive]} />
      ) : null}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ITEM_HORIZONTAL_MARGIN,
    paddingHorizontal: ITEM_HORIZONTAL_PADDING,
    borderRadius: rem(16),
  },
  containerInactive: {
    opacity: 0.5,
    backgroundColor: COLORS.white,
  },
  activeHighlighted: {
    borderWidth: 1,
    borderColor: COLORS.shamrock,
  },
  containerActive: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      android: {
        /*
         * Added extra margin because shadow disappears
         * when active tasks are changed
         */
        margin: StyleSheet.hairlineWidth,
      },
      default: {},
    }),
  },
  inviteActive: {
    marginBottom: rem(10),
  },
  iconContainer: {
    width: STEP_ICON_SIZE,
    height: STEP_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(12),
    marginLeft: rem(12),
    marginRight: rem(10),
    marginVertical: ICON_VERTICAL_OFFSET,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...font(12, 16, 'bold', 'downriver'),
  },
  titleActive: {
    color: COLORS.cornflowerBlue,
  },
  description: {
    marginTop: rem(4),
    ...font(12, 16, 'medium', 'toreaBay'),
  },
  lockIcon: {
    position: 'absolute',
    width: LOCK_ICON_SIZE,
    height: LOCK_ICON_SIZE,
    bottom: -LOCK_ICON_SIZE / 3,
    right: -LOCK_ICON_SIZE / 3,
    borderRadius: LOCK_ICON_SIZE / 2,
    borderColor: COLORS.white,
    borderWidth: 1,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
