// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
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
          title: 'Start mining',
          description: 'Your first mining session.',
        };

      case 'profilePicture':
        return {
          Icon: <UserCircleSvg />,
          iconBackground: styles.profilePictureBC,
          title: 'Profile picture',
          description: 'Upload your profile image.',
        };

      case 'joinTelegram':
        return {
          Icon: <TelegramSvg />,
          iconBackground: styles.joinTelegramBC,
          title: 'Join Telegram',
          description: 'Be part of our community and join now.',
        };

      case 'followUsTwitter':
        return {
          Icon: <TwitterSvg />,
          iconBackground: styles.followTwitterBC,
          title: 'Follow us on Twitter',
          description: 'Let’s keep in touch, follow us on twitter.',
        };
      case 'invite5Friends':
        return {
          Icon: <InviteFriendsSvg color={COLORS.white} />,
          iconBackground: styles.invite5FriendsBC,
          title: 'Invite 5 Friends',
          description: 'Create your team and increase your earnings.',
        };
      case 'socialShare':
        return {
          Icon: <ShareSvg />,
          iconBackground: styles.socialShareBC,
          title: 'Social Share',
          description: 'Share it with your friends on social media.',
        };
      case 'claimYourNickname':
      default:
        return {
          Icon: <VerifiedUserSvg />,
          iconBackground: styles.claimNickNameBC,
          title: 'Claim your nickname',
          description: 'Set it and start earning from your invite.',
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
    marginHorizontal: 28,
    paddingHorizontal: 13,
    borderRadius: 16,
  },
  containerInactive: {
    opacity: 0.5,
    backgroundColor: COLORS.white,
  },
  containerActive: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconWrapper: {
    paddingHorizontal: 9,
    paddingVertical: 11,
  },
  iconContainer: {
    width: 36,
    height: 36,
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
    color: '#4A86EF',
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
    backgroundColor: '#1B47C3',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 4,
    right: 4,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  claimNickNameBC: {
    backgroundColor: '#256FF8',
  },
  startMiningBC: {
    backgroundColor: '#0A2155',
  },
  profilePictureBC: {
    backgroundColor: '#98A4BB',
  },
  joinTelegramBC: {
    backgroundColor: '#6556EE',
  },
  followTwitterBC: {
    backgroundColor: '#113B98',
  },
  invite5FriendsBC: {
    backgroundColor: '#5F5DB1',
  },
  socialShareBC: {
    backgroundColor: '#FF6969',
  },
});
