// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ContactItem} from '@screens/Team/components/ContactItem';
import {TeamContactInvite} from '@screens/Team/components/ContactsList/assets/TeamContactInvite';
import {ContactsInviteButton} from '@screens/Team/components/ContactsList/components/ContactsInviteButton';
import {MultipleNumbers} from '@screens/Team/components/ContactsList/components/MultipleNumbers';
import {SectionHeader} from '@screens/Team/components/ContactsList/components/SectionHeader';
import {useGetContacts} from '@screens/Team/components/ContactsList/hooks/useGetContacts';
import {TeamActions} from '@store/modules/Team/actions';
import {
  getContactsByIdsSelector,
  getIceFriendsSelector,
} from '@store/modules/Team/selectors';
import {WhiteLogoSvg} from '@svg/WhiteLogo';
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

interface ContactsListProps {}

export const ContactsList = ({}: ContactsListProps) => {
  const dispatch = useDispatch();
  const contactsByIds = useSelector(getContactsByIdsSelector);
  const iceFriends = useSelector(getIceFriendsSelector);

  const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});

  const sections = useGetContacts();

  const renderSectionHeader = ({section}: {section: {title: string}}) => (
    <SectionHeader section={section} />
  );

  const renderItem = ({item, index}: {item: string; index: number}) => {
    if (item === 'InviteFriendsButton') {
      return <InviteButton style={styles.inviteButtonContainer} />;
    }
    const contact = contactsByIds[item];
    const isFriend = iceFriends.includes(item);
    return (
      <ContactItem
        index={index}
        item={contact}
        backgroundColor={contact.backgroundColor}
        leftIconContent={
          isFriend ? (
            <WhiteLogoSvg />
          ) : (
            <Text style={styles.contactIconText}>{`${contact.firstName.charAt(
              0,
            )}${contact.lastName.charAt(0)}`}</Text>
          )
        }
        rightSideButton={
          isFriend ? null : (
            <ContactsInviteButton
              text={'invite'}
              icon={<TeamContactInvite />}
              onPress={() => invite(contact.id)}
            />
          )
        }
        indicatorContent={
          contact.phoneNumbers.length > 1 && !isFriend ? (
            <MultipleNumbers />
          ) : isFriend ? (
            <View
              style={[
                styles.activityIndicatorContainer,
                {
                  backgroundColor: contact?.isActive
                    ? COLORS.shamrock
                    : COLORS.cadetBlue,
                },
              ]}
            />
          ) : null
        }
      />
    );
  };

  const invite = (id: string) => {
    dispatch(TeamActions.INVITE_CONTACT.STATE.create(id));
  };

  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={tabbarOffset.current}
        style={styles.sectionListStyle}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  sectionListStyle: {
    width: '100%',
    marginTop: 22,
  },
  inviteButtonContainer: {
    marginHorizontal: 0,
    marginBottom: rem(28),
    marginTop: rem(4),
  },
  contactIconText: {
    color: COLORS.white,
    fontFamily: FONTS.primary.regular,
    fontSize: font(15),
  },
  activityIndicatorContainer: {
    width: rem(15),
    height: rem(15),
    borderRadius: rem(7.5),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
