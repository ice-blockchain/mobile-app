// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {Description} from '@screens/HomeFlow/InAppNotifications/components/Description';
import {ActivityItemProps} from '@screens/HomeFlow/InAppNotifications/components/NotificationsList';
import {Time} from '@screens/HomeFlow/InAppNotifications/components/Time';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const DEFAULT_AVATAR_SIZE = rem(44);
export const DEFAULT_AVATAR_RADIUS = rem(15);

export const DefaultNotification = ({activity, onPress}: ActivityItemProps) => {
  const renderAvatar = () => {
    if (activity.extra?.imageUrls && activity.extra?.imageUrls.length >= 2) {
      return (
        <View style={[styles.smallAvatarsContainer, styles.iconContainer]}>
          <Image
            source={{uri: activity.extra?.imageUrls[0] || ''}}
            style={styles.smallFirstAvatar}
          />
          <Image
            source={{uri: activity.extra?.imageUrls[1] || ''}}
            style={styles.smallSecondAvatar}
          />
        </View>
      );
    } else {
      return (
        <Avatar
          uri={activity.extra?.imageUrl || ''}
          size={DEFAULT_AVATAR_SIZE}
          borderRadius={DEFAULT_AVATAR_RADIUS}
          style={styles.avatarContainer}
          allowFullScreen={false}
        />
      );
    }
  };

  return (
    <Touchable style={styles.container} onPress={onPress}>
      <Time time={activity.time} />
      {renderAvatar()}
      <Description value={activity.extra?.description || ''} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: rem(14),
  },
  smallFirstAvatar: {
    width: rem(28),
    height: rem(28),
    borderRadius: rem(9),
  },
  smallSecondAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: rem(30),
    height: rem(30),
    borderRadius: rem(9),
  },
  smallAvatarsContainer: {
    width: rem(44),
  },
  iconContainer: {
    marginRight: rem(14),
    width: rem(44),
  },
});
