// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ChatTabRow} from '@screens/ChatFlow/components/ChatTabRow';
import {dayjs} from '@services/dayjs';
import {MessageData, MessageStatusType} from '@store/modules/Chat/types';
import {SeenIcon} from '@svg/SeenIcon';
import {SentIcon} from '@svg/SentIcon';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  messageData: MessageData;
};

function getLastMessageTimeText(minutesAgo: number) {
  const now = dayjs();
  const lastSeenTime = now.subtract(minutesAgo, 'minute');
  return `${lastSeenTime.from(now)}`;
}

function getStatusTypeIcon(lastMessageStatus: MessageStatusType) {
  switch (lastMessageStatus) {
    case 'sent':
      return <SentIcon />;
    case 'received':
      return <SeenIcon color={COLORS.secondary} />;
    case 'seen':
      return <SeenIcon />;
    default:
      return null;
  }
}

export function ChatRow({messageData}: Props) {
  return (
    <ChatTabRow
      icon={messageData.icon}
      title={messageData.sourceName}
      sourceType={messageData.sourceType}
      subtitle={messageData.lastMessage}
      isVerified={messageData.isVerified}
      rightComponent={
        <View style={styles.rightContainer}>
          <View style={styles.topRightContainer}>
            {getStatusTypeIcon(messageData.lastMessageStatus)}
            <Text style={styles.timeText}>
              {getLastMessageTimeText(messageData.minutesAgo)}
            </Text>
          </View>
          {messageData.unreadMessages > 1 ? (
            <View style={styles.messagesCounterContainer}>
              <Text style={styles.messagesCounterText}>{3}</Text>
            </View>
          ) : null}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  rightContainer: {
    paddingLeft: rem(10),
    paddingTop: rem(4),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '100%',
  },
  topRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    paddingLeft: rem(6),
    ...font(10, 19, 'regular', 'secondary'),
  },
  messagesCounterContainer: {
    backgroundColor: COLORS.attention,
    borderRadius: rem(16) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: rem(16),
    minWidth: rem(16),
    marginTop: rem(6),
  },
  messagesCounterText: {
    ...font(10, 11, 'black', 'white'),
  },
});
