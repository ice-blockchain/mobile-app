// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {
  itemHeight,
  itemLeftPosition,
  TaskItem,
  TCompleteTheTask,
} from '@screens/Home/components/Content/components/CompleteTheTask/TaskItem';
import {ProgressCircleSvg} from '@svg/ProgressCircle';
import {translate} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

interface CompleteTheTaskProps {}

const taskItems: TCompleteTheTask[] = [
  {type: 'claimYourNickname', completed: true, isActive: false},
  {type: 'startMining', completed: false, isActive: true},
  {type: 'profilePicture', completed: false, isActive: false},
  {type: 'joinTelegram', completed: false, isActive: false},
  {type: 'followUsTwitter', completed: false, isActive: false},
  {type: 'invite5Friends', completed: false, isActive: false},
  {type: 'socialShare', completed: false, isActive: false},
];

const halfHeaderHeight = 59 / 2;

export const CompleteTheTask = ({}: CompleteTheTaskProps) => {
  const activeItem = taskItems.findIndex(v => v.isActive) + 1;
  const completedTasksAmount = taskItems.filter(v => v.completed).length;
  const activeLineHeight =
    halfHeaderHeight + itemHeight * (activeItem - 1) + itemHeight / 2;

  const progreccInPercent = (completedTasksAmount / taskItems.length) * 100;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.upcomingTasksLine,
          {
            top: halfHeaderHeight,
            bottom: itemHeight / 2,
          },
        ]}
      />
      <View
        style={[
          styles.finishedTasksLine,
          {
            top: halfHeaderHeight,
            height: activeLineHeight,
          },
        ]}
      />
      <View style={styles.header}>
        <View style={styles.amountWrapper}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>
              {completedTasksAmount}
              <Text style={styles.amountTextSmall}>{' of '}</Text>
              {taskItems.length}
            </Text>
          </View>
          <View style={styles.progress}>
            <ProgressCircleSvg progress={progreccInPercent} />
          </View>
        </View>
        <View>
          <Text style={styles.title}>{translate('home.steps.title')}</Text>
          <Text style={styles.description}>
            {translate('home.steps.description')}
          </Text>
        </View>
      </View>
      {taskItems.map(task => (
        <TaskItem key={task.type} task={task} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(35),
    marginBottom: 48,
  },
  amountWrapper: {
    marginLeft: itemLeftPosition - 49 / 2,
    width: 49,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 49 / 2,
    marginRight: 10,
    ...commonStyles.shadow,

    backgroundColor: COLORS.white,
  },
  amountContainer: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    borderWidth: 1,
    borderColor: COLORS.gallery,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: font(9),
    lineHeight: rem(11),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
  },
  amountTextSmall: {
    fontSize: font(6),
    lineHeight: rem(11),
    fontFamily: FONTS.primary.regular,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: font(14),
    lineHeight: rem(17),
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
  },
  description: {
    fontSize: font(12),
    lineHeight: rem(14),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
  },
  finishedTasksLine: {
    position: 'absolute',
    left: itemLeftPosition,
    width: 1,
    backgroundColor: COLORS.shamrock,
  },
  upcomingTasksLine: {
    position: 'absolute',
    left: itemLeftPosition,
    width: 1,
    backgroundColor: COLORS.heather,
  },
  progress: {
    position: 'absolute',
  },
});
