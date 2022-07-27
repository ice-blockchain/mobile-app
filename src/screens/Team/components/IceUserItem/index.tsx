// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {RemoteImage} from '@components/RemoteImage';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {RingIcon} from '@screens/Team/components/Contacts/components/ContactsList/assets/svg/Ring';
import {ContactsInviteButton} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactsInviteButton';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {font, rem} from 'rn-units';

export const IceUserItem = ({
  user,
  onPress,
}: {
  user: User;
  onPress: () => void;
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.contactContainer}>
        <View style={styles.contactInfo}>
          <View style={styles.contactIcon}>
            {user.profilePictureUrl && (
              <RemoteImage
                uri={user.profilePictureUrl}
                width={rem(46)}
                height={rem(46)}
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
          <View>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.status}>
              {user.active
                ? t('team.tier_one.active')
                : t('team.tier_one.inactive')}
            </Text>
          </View>
        </View>
        <View style={styles.rightButtonContainer}>
          <ContactsInviteButton
            disabled={user.pinged}
            icon={
              <RingIcon
                fill={user.pinged ? COLORS.cadetBlue : COLORS.darkBlue}
              />
            }
            text={t('team.tier_one.ping')}
            onPress={onPress}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rem(14),
  },
  contactInfo: {
    flexDirection: 'row',
  },
  contactIcon: {
    width: rem(46),
    height: rem(46),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rem(14),
  },
  image: {
    width: rem(46),
    height: rem(46),
    borderRadius: 16,
  },
  rightButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: rem(12),
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
});
