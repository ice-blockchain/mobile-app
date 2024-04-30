// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {INVITE_CARD_TOP_OFFSET} from '@screens/InviteFlow/InviteFriend';
import {getContactAcronym} from '@utils/contacts';
import {stringToColor} from '@utils/string';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import {rem} from 'rn-units';

const AVATAR_SIDE_DIMENSION = rem(112);
const AVATAR_BORDER_RADIUS = rem(36);
export const AVATAR_CONTAINER_SIDE_DIMENSION = rem(122);

interface InviteAvatarProps {
  contact: Contact;
}
export const InviteAvatar = ({contact}: InviteAvatarProps) => {
  const {top: topInset} = useSafeAreaInsets();
  const phoneNumbers = contact.phoneNumbers.map(n => n.number);
  const topOffset = {
    top:
      HEADER_HEIGHT +
      topInset +
      INVITE_CARD_TOP_OFFSET -
      AVATAR_CONTAINER_SIDE_DIMENSION / 2,
  };
  return (
    <View style={[styles.container, topOffset]}>
      {!contact.thumbnailPath && (
        <View
          style={[
            styles.contactIcon,
            styles.textAvatar,
            {
              backgroundColor: stringToColor(
                contact.givenName || phoneNumbers[0],
              ),
            },
          ]}>
          <Text style={styles.contactIconText}>
            {getContactAcronym(contact)}
          </Text>
        </View>
      )}
      {contact.thumbnailPath !== '' && (
        <View style={styles.avatar}>
          <Avatar
            uri={contact.thumbnailPath}
            size={AVATAR_SIDE_DIMENSION}
            borderRadius={AVATAR_BORDER_RADIUS}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: AVATAR_CONTAINER_SIDE_DIMENSION,
    height: AVATAR_CONTAINER_SIDE_DIMENSION,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: AVATAR_CONTAINER_SIDE_DIMENSION / 3,
  },
  avatar: {
    marginTop: (AVATAR_CONTAINER_SIDE_DIMENSION - AVATAR_SIDE_DIMENSION) / 2,
    marginLeft: (AVATAR_CONTAINER_SIDE_DIMENSION - AVATAR_SIDE_DIMENSION) / 2,
  },
  textAvatar: {
    width: AVATAR_SIDE_DIMENSION,
    height: AVATAR_SIDE_DIMENSION,
    borderRadius: AVATAR_BORDER_RADIUS,
    marginTop: (AVATAR_CONTAINER_SIDE_DIMENSION - AVATAR_SIDE_DIMENSION) / 2,
    marginLeft: (AVATAR_CONTAINER_SIDE_DIMENSION - AVATAR_SIDE_DIMENSION) / 2,
  },
  contactIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIconText: {
    ...font(40, 50, 'bold', 'white'),
  },
});

export default InviteAvatar;
