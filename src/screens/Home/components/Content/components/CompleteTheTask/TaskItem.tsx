// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {InviteFriendsSvg} from '@svg/InviteFriends';
import {LockSvg} from '@svg/Lock';
import {LogoIconSvg} from '@svg/LogoIcon';
import {ShareSvg} from '@svg/Share';
import {TaskCompletedSvg} from '@svg/TaskCompleted';
import {TaskNotCompletedSvg} from '@svg/TaskNotCompleted';
import {TelegramSvg} from '@svg/Telegram';
import {TwitterSvg} from '@svg/Twitter';
import {UserCircleSvg} from '@svg/UserCircle';
import {VerifiedUserSvg} from '@svg/VerifiedUser';
import {translate} from '@translations/i18n';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';
type TCompleteTheTaskTypes =
  | 'claimYourNickname'
  | 'startMining'
  | 'profilePicture'
  | 'joinTelegram'
  | 'followUsTwitter'
  | 'invite5Friends'
  | 'socialShare';
export type TCompleteTheTask = {
  type: TCompleteTheTaskTypes;
  completed: boolean;
  isActive: boolean;
};

interface TaskItemProps {
  task: TCompleteTheTask;
}

const iconSize = 36;
const iconPaddingVertical = rem(11);

const itemMarginHorizontal = rem(28);
const itemPaddingHorizontal = rem(13);
const doneIconSize = 23;

export const itemLeftPosition =
  itemMarginHorizontal + itemPaddingHorizontal + doneIconSize / 2;
export const itemHeight = iconSize + iconPaddingVertical * 2;

export const TaskItem = ({task}: TaskItemProps) => {
  const getContent = (
    type: TCompleteTheTaskTypes,
  ): {
    Icon: JSX.Element;
    iconBackground: ViewStyle;
    title: string;
    description: string;
  } => {
    switch (type) {
      case 'startMining':
        return {
          Icon: <LogoIconSvg color={COLORS.white} width={24} height={24} />,
          iconBackground: styles.startMiningBC,
          title: translate('home.steps.step_one.title'),
          description: translate('home.steps.step_one.description'),
        };

      case 'profilePicture':
        return {
          Icon: <UserCircleSvg />,
          iconBackground: styles.profilePictureBC,
          title: translate('home.steps.step_two.title'),
          description: translate('home.steps.step_two.description'),
        };

      case 'joinTelegram':
        return {
          Icon: <TelegramSvg />,
          iconBackground: styles.joinTelegramBC,
          title: translate('home.steps.step_three.title'),
          description: translate('home.steps.step_three.description'),
        };

      case 'followUsTwitter':
        return {
          Icon: <TwitterSvg />,
          iconBackground: styles.followTwitterBC,
          title: translate('home.steps.step_four.title'),
          description: translate('home.steps.step_four.description'),
        };
      case 'invite5Friends':
        return {
          Icon: <InviteFriendsSvg color={COLORS.white} />,
          iconBackground: styles.invite5FriendsBC,
          title: translate('home.steps.step_five.title'),
          description: translate('home.steps.step_five.description'),
        };
      case 'socialShare':
        return {
          Icon: <ShareSvg />,
          iconBackground: styles.socialShareBC,
          title: translate('home.steps.step_six.title'),
          description: translate('home.steps.step_six.description'),
        };
      case 'claimYourNickname':
      default:
        return {
          Icon: <VerifiedUserSvg />,
          iconBackground: styles.claimNickNameBC,
          title: translate('home.steps.step_seven.title'),
          description: translate('home.steps.step_seven.description'),
        };
    }
  };
  const {Icon, iconBackground, title, description} = getContent(task.type);
  const isLocked = !task.completed && !task.isActive;
  return (
    <TouchableOpacity
      style={[styles.container, task.isActive ? styles.containerActive : null]}
      disabled={!task.isActive}>
      {task.completed ? <TaskCompletedSvg /> : <TaskNotCompletedSvg />}
      <View style={styles.iconWrapper}>
        <View style={[styles.iconContainer, iconBackground]}>{Icon}</View>
        {isLocked ? (
          <View style={styles.lockIcon}>
            <LockSvg />
          </View>
        ) : null}
      </View>
      <View>
        <Text style={[styles.title, task.isActive ? styles.titleActive : null]}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {isLocked ? (
        <View style={[StyleSheet.absoluteFill, styles.containerInactive]} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: itemMarginHorizontal,
    paddingHorizontal: itemPaddingHorizontal,
    borderRadius: 16,
  },
  containerInactive: {
    opacity: 0.5,
    backgroundColor: COLORS.white,
  },
  containerActive: {
    backgroundColor: COLORS.white,
    ...commonStyles.shadow,
  },
  iconWrapper: {
    paddingHorizontal: 9,
    paddingVertical: iconPaddingVertical,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 4,
    marginRight: 2,
  },
  title: {
    fontSize: font(12),
    lineHeight: rem(14),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
  },
  titleActive: {
    color: COLORS.cornflowerBlue,
  },
  description: {
    fontSize: font(12),
    lineHeight: rem(14),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
  },
  lockIcon: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.persianBlue,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 4,
    right: 4,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  claimNickNameBC: {
    backgroundColor: COLORS.dodgerBlue,
  },
  startMiningBC: {
    backgroundColor: COLORS.downriver,
  },
  profilePictureBC: {
    backgroundColor: COLORS.gullGray,
  },
  joinTelegramBC: {
    backgroundColor: COLORS.royalBlue,
  },
  followTwitterBC: {
    backgroundColor: COLORS.toreaBay,
  },
  invite5FriendsBC: {
    backgroundColor: COLORS.blueViolet,
  },
  socialShareBC: {
    backgroundColor: COLORS.bittersweet,
  },
});
