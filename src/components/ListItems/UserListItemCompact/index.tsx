// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {ClosedEye} from '@svg/ClosedEye';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const UserListItemCompact = memo(
  ({
    name,
    profilePictureUrl,
    iceAmount,
    AdditionalInfoComponent,
  }: {
    name?: string | null | ReactNode;
    profilePictureUrl?: string | null;
    iceAmount?: string;
    AdditionalInfoComponent?: ReactNode;
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {profilePictureUrl ? (
            <Avatar
              uri={profilePictureUrl}
              size={rem(40)}
              borderRadius={rem(9)}
              allowFullScreen={false}
            />
          ) : (
            <View style={styles.hiddenImage}>
              <ClosedEye color={COLORS.primaryLight} />
            </View>
          )}
        </View>
        {name ? (
          <Text style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
        ) : (
          <View style={styles.hiddenNameContainer}>
            <View style={styles.hiddenName}>
              <ClosedEye color={COLORS.primaryLight} />
            </View>
          </View>
        )}
        {iceAmount ? (
          <View style={styles.iceContainer}>
            <Text style={styles.iceText}>{iceAmount}</Text>
            <Text> </Text>
            <Text style={styles.iceText}>
              <IceLabel
                iconOffsetY={1.3}
                iconSize={12}
                color={COLORS.secondary}
                reversed={isRTL}
              />
            </Text>
          </View>
        ) : (
          AdditionalInfoComponent
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(16),
  },
  imageContainer: {
    width: rem(40),
    height: rem(40),
    marginRight: rem(12),
  },
  hiddenImage: {
    backgroundColor: COLORS.secondaryFaint,
    flex: 1,
    borderRadius: rem(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    flex: 1,
    ...font(15, 20, 'semibold', 'primaryDark'),
    textAlignVertical: 'center',
  },
  hiddenNameContainer: {
    flex: 1,
  },
  hiddenName: {
    width: rem(76),
    height: rem(24),
    borderRadius: rem(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryFaint,
  },
  iceContainer: {
    flexDirection: 'row',
  },
  iceText: {
    textAlignVertical: 'center',
    ...font(12, 16, 'semibold', 'secondary'),
  },
});
