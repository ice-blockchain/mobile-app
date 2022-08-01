// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {stopPropagination} from '@components/KeyboardDismiss';
import {RemoteImage} from '@components/RemoteImage';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {font, rem} from 'rn-units';

export const UserListItem = ({
  user,
  rightButton,
}: {
  user: User;
  rightButton?: ReactNode;
}) => {
  return (
    <View style={styles.container} {...stopPropagination}>
      <View style={styles.imageContainer}>
        {user.profilePictureUrl && (
          <RemoteImage
            uri={user.profilePictureUrl}
            width={rem(46)}
            style={styles.image}
          />
        )}
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: user?.active
                ? COLORS.shamrock
                : COLORS.cadetBlue,
            },
          ]}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {user.username}
        </Text>
        <Text style={styles.status}>
          {user.active ? t('users.active') : t('users.inactive')}
        </Text>
      </View>
      {rightButton}
    </View>
  );
};

export const UserListItemSkeleton = ({
  containerStyle,
}: {containerStyle?: StyleProp<ViewStyle>} = {}) => (
  <SkeletonPlaceholder>
    <View style={[styles.skeleton, containerStyle]} />
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: rem(14),
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  imageContainer: {
    width: rem(46),
    height: rem(46),
    marginRight: rem(14),
  },
  image: {
    width: rem(46),
    height: rem(46),
    borderRadius: rem(16),
  },
  indicator: {
    width: rem(15),
    height: rem(15),
    borderRadius: rem(7.5),
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  name: {
    fontSize: font(16),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    paddingBottom: rem(3),
  },
  status: {
    fontSize: font(13.5),
    fontFamily: FONTS.primary.medium,
    color: COLORS.emperor,
  },
  skeleton: {
    height: rem(46),
    borderRadius: rem(16),
    marginTop: rem(14),
    alignSelf: 'stretch',
  },
});
