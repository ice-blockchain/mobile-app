// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {dayjs} from '@services/dayjs';
import {ChatUserData} from '@store/modules/Chat/types';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  chatUser: ChatUserData;
};

function getLastSeenText(minutesAgo: number) {
  const now = dayjs();
  const lastSeenTime = now.subtract(minutesAgo, 'minute');
  return `${t('chat.messages.last_seen')} ${lastSeenTime.from(now)}`;
}

export function ChatSelectorRow({chatUser}: Props) {
  const isOnline = chatUser.lastSeenMinutesAgo < 5;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar
          uri={chatUser.icon}
          size={rem(46)}
          borderRadius={15}
          allowFullScreen={false}
        />
        <View style={[styles.onlineIndicator, isOnline && styles.online]} />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.username}>{chatUser.username}</Text>
        <Text style={styles.lastSeen}>
          {isOnline
            ? t('chat.messages.online')
            : getLastSeenText(chatUser.lastSeenMinutesAgo)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    paddingLeft: rem(12),
  },
  username: {
    ...font(16, 19, 'bold', 'primaryDark'),
  },
  lastSeen: {
    paddingTop: rem(4),
    ...font(12, 14, 'medium', 'secondary'),
  },
  imageContainer: {
    width: rem(46),
    height: rem(46),
    borderRadius: rem(15),
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: rem(14),
    height: rem(14),
    borderRadius: rem(14) / 2,
    borderWidth: 2,
    backgroundColor: COLORS.cadetBlue,
    borderColor: COLORS.white,
  },
  online: {
    backgroundColor: COLORS.shamrock,
  },
});
