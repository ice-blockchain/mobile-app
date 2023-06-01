// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles, HIT_SLOP} from '@constants/styles';
import {ChatSourceType} from '@store/modules/Chat/types';
import {ChannelIcon} from '@svg/ChannelIcon';
import {PrivateConversationIcon} from '@svg/PrivateConversationIcon';
import {TeamActiveIcon} from '@svg/TeamActiveIcon';
import {VerifiedIcon} from '@svg/VerifiedIcon';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type Props = {
  rightComponent: React.ReactNode;
  icon: string;
  sourceType: ChatSourceType;
  title: string;
  isVerified?: boolean;
  subtitle: string;
  subtitleIcon?: React.ReactNode;
  onPress?: () => void;
};

function getSourceTypeIcon(sourceType: ChatSourceType) {
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

export function ChatTabRow({
  icon,
  sourceType,
  rightComponent,
  title,
  isVerified,
  subtitle,
  subtitleIcon,
  onPress,
}: Props) {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={onPress}
      hitSlop={HIT_SLOP}>
      <View style={styles.imageMainContainer}>
        <View style={styles.imageContainer}>
          <Avatar
            uri={icon}
            size={rem(48)}
            borderRadius={15}
            allowFullScreen={false}
          />
          <View style={[styles.sourceTypeContainer, commonStyles.shadow]}>
            {getSourceTypeIcon(sourceType)}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.titlesContainer,
          rightComponent ? commonStyles.flexOne : null,
        ]}>
        <View style={commonStyles.row}>
          <Text style={styles.title}>{title}</Text>
          {isVerified ? (
            <View style={styles.verifiedContainer}>
              <VerifiedIcon />
            </View>
          ) : null}
        </View>
        <View style={styles.subtitleContainer}>
          {subtitleIcon}
          <Text style={styles.subTitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>
      {rightComponent}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  titlesContainer: {
    paddingLeft: rem(10),
  },
  title: {
    ...font(14, 19, 'black', 'primaryDark'),
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    paddingTop: rem(4),
    ...font(12, 19, 'medium', 'secondary'),
  },
  imageMainContainer: {
    overflow: 'hidden',
  },
  imageContainer: {
    width: rem(48),
    height: rem(48),
    borderRadius: rem(15),
  },
  sourceTypeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -rem(4),
    bottom: -rem(4),
    width: rem(22),
    height: rem(22),
    borderRadius: rem(22) / 2,
    backgroundColor: COLORS.white,
  },
  verifiedContainer: {
    paddingLeft: rem(4),
    paddingTop: rem(4),
  },
});
