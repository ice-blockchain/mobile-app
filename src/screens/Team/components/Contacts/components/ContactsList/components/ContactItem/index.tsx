// SPDX-License-Identifier: BUSL-1.1

import {stopPropagination} from '@components/KeyboardDismiss';
import {UserListItemButton} from '@components/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {TeamContactInvite} from '@screens/Team/components/Contacts/components/ContactsList/assets/svg/TeamContactInvite';
import {MultipleNumbers} from '@screens/Team/components/Contacts/components/ContactsList/components/MultipleNumbers';
import {t} from '@translations/i18n';
import {getContactAcronym, getContactName} from '@utils/contacts';
import {stringToColor} from '@utils/string';
import React, {memo, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Contact} from 'react-native-contacts';
import {font, rem} from 'rn-units';

const phoneNumberLineHeight = font(20);

export const ContactItem = memo(
  ({
    index,
    contact,
    onInvite,
  }: {
    index: number;
    contact: Contact;
    onInvite: (contactId: string) => void;
  }) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
      undefined,
    );
    const [height, setActiveHeight] = useState<number | undefined>(0);
    const phoneNumbers = contact.phoneNumbers.map(n => n.number);
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
      <View style={styles.contactContainer} {...stopPropagination}>
        <View
          style={[
            styles.contactIcon,
            {
              backgroundColor: stringToColor(
                contact.givenName || phoneNumbers[0],
              ),
            },
          ]}>
          <Text style={styles.contactIconText}>
            {getContactAcronym(contact)}
          </Text>
          <TouchableOpacity
            disabled={phoneNumbers.length === 1}
            onPress={showAllNumbers}
            style={styles.indicator}>
            {phoneNumbers.length > 1 && <MultipleNumbers />}
          </TouchableOpacity>
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
        <UserListItemButton
          text={t('team.contacts_list.invite')}
          icon={<TeamContactInvite fill={COLORS.darkBlue} />}
          onPress={() => onInvite(contact.recordID)}
        />
      </View>
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
  },
  contactIcon: {
    width: rem(46),
    height: rem(46),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rem(14),
  },
  name: {
    fontSize: font(16),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    paddingBottom: rem(3),
    marginRight: rem(4),
  },
  hiddenNumbers: {
    overflow: 'hidden',
  },
  phoneNumber: {
    fontSize: font(14),
    height: phoneNumberLineHeight,
    fontFamily: FONTS.primary.medium,
    color: COLORS.scorpion,
  },
  indicator: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    zIndex: 10,
  },
  contactIconText: {
    color: COLORS.white,
    fontFamily: FONTS.primary.regular,
    fontSize: font(15),
  },
});
