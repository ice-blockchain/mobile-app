// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {UserListItemButton} from '@components/ListItems/UserListItem/components/UserListItemButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {TeamContactInvite} from '@screens/Team/components/Contacts/components/ContactsList/assets/svg/TeamContactInvite';
import {MultipleNumbers} from '@screens/Team/components/Contacts/components/ContactsList/components/MultipleNumbers';
import {t} from '@translations/i18n';
import {getContactAcronym, getContactName} from '@utils/contacts';
import {stringToColor} from '@utils/string';
import {font} from '@utils/styles';
import React, {memo, useState} from 'react';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import {rem} from 'rn-units';

const phoneNumberLineHeight = rem(20);

const AVATAR_SIZE = rem(46);
const AVATAR_BORDER_RADIUS = rem(16);

export const ContactItem = memo(
  ({
    index,
    contact,
    onInvite,
  }: {
    index: number;
    contact: Contact;
    onInvite: (contact: Contact) => void;
  }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
      undefined,
    );
    const [height, setActiveHeight] = useState<number | undefined>(0);

    const phoneNumbers = [
      ...contact.phoneNumbers.reduce<Set<string>>((result, n) => {
        result.add(n.number);
        return result;
      }, new Set<string>()),
    ];

    const showAllNumbers = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      if (activeIndex === index) {
        setActiveIndex(undefined);
        setActiveHeight(0);
      } else {
        setActiveIndex(index);
        setActiveHeight((phoneNumbers.length - 1) * phoneNumberLineHeight);
      }
    };
    return (
      <Touchable
        style={styles.contactContainer}
        onPress={() => onInvite(contact)}>
        <View
          style={[
            styles.contactIcon,
            {
              backgroundColor: stringToColor(
                contact.givenName || contact.familyName || phoneNumbers[0],
              ),
            },
          ]}>
          <Text style={styles.contactIconText}>
            {getContactAcronym(contact)}
          </Text>
          {contact.thumbnailPath ? (
            <Avatar
              uri={contact.thumbnailPath}
              size={AVATAR_SIZE}
              borderRadius={AVATAR_BORDER_RADIUS}
              allowFullScreen={false}
              style={styles.avatarContainer}
            />
          ) : null}
          <Touchable
            disabled={phoneNumbers.length === 1}
            onPress={showAllNumbers}
            style={styles.indicator}>
            {phoneNumbers.length > 1 && <MultipleNumbers />}
          </Touchable>
        </View>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {getContactName(contact)}
          </Text>
          <Text style={styles.phoneNumber}>{phoneNumbers[0]}</Text>

          {phoneNumbers.length === 1 ? null : (
            <View style={[styles.hiddenNumbers, {height}]}>
              {phoneNumbers.slice(1).map(num => (
                <Text style={styles.phoneNumber} key={num}>
                  {num}
                </Text>
              ))}
            </View>
          )}
        </View>
        {isLightDesign ? null : (
          <UserListItemButton
            text={t('team.contacts_list.invite')}
            icon={<TeamContactInvite fill={COLORS.primaryDark} />}
            onPress={() => onInvite(contact)}
          />
        )}
      </Touchable>
    );
  },
);

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: rem(14),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  contactIcon: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rem(14),
  },
  avatarContainer: {position: 'absolute'},
  name: {
    paddingBottom: rem(3),
    marginRight: rem(4),
    ...font(16, null, 'bold', 'primaryDark'),
  },
  hiddenNumbers: {
    overflow: 'hidden',
  },
  phoneNumber: {
    height: phoneNumberLineHeight,
    ...font(14, null, 'medium', 'scorpion'),
  },
  indicator: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    zIndex: 10,
  },
  contactIconText: {
    ...font(15),
  },
});
