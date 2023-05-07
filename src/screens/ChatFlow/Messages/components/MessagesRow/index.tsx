// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import {
  MessageData,
  MessageSourceType,
  MessageStatusType,
} from '@store/modules/Chat/types';
import {ChannelIcon} from '@svg/ChannelIcon';
import {PrivateConversationIcon} from '@svg/PrivateConversationIcon';
import {SeenIcon} from '@svg/SeenIcon';
import {SentIcon} from '@svg/SentIcon';
import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {VerifiedIcon} from '@svg/VerifiedIcon';
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

function getSourceTypeIcon(sourceType: MessageSourceType) {
  switch (sourceType) {
    case 'channel':
      return <ChannelIcon />;
    case 'group':
      return <TeamActiveIcon width={rem(22)} height={rem(22)} />;
    case 'private':
      return <PrivateConversationIcon />;
    default:
      return null;
  }
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

export function MessagesRow({messageData}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar
          uri={messageData.icon}
          size={rem(48)}
          borderRadius={15}
          allowFullScreen={false}
        />
        <View style={[styles.sourceTypeContainer, commonStyles.shadow]}>
          {getSourceTypeIcon(messageData.sourceType)}
        </View>
      </View>
      <View style={styles.messageContainer}>
        <View style={commonStyles.row}>
          <Text style={styles.sourceName}>{messageData.sourceName}</Text>
          {messageData.isVerified ? (
            <View style={styles.verifiedContainer}>
              <VerifiedIcon />
            </View>
          ) : null}
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {messageData.lastMessage}
        </Text>
      </View>
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
    paddingLeft: rem(10),
  },
  sourceName: {
    ...font(14, 19, 'black', 'primaryDark'),
  },
  lastMessage: {
    paddingTop: rem(4),
    ...font(12, 19, 'medium', 'secondary'),
  },
  imageContainer: {
    width: rem(48),
    height: rem(48),
    borderRadius: 15,
  },
  sourceTypeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -5,
    bottom: -5,
    width: rem(22),
    height: rem(22),
    borderRadius: rem(22) / 2,
    backgroundColor: COLORS.white,
  },
  verifiedContainer: {
    paddingLeft: rem(4),
    paddingTop: rem(4),
  },
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
