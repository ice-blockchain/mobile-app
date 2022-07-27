// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {InviteButton} from '@components/InviteButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TeamContactInvite} from '@screens/Team/components/Contacts/components/ContactsList/assets/svg/TeamContactInvite';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {ContactsInviteButton} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactsInviteButton';
import {MultipleNumbers} from '@screens/Team/components/Contacts/components/ContactsList/components/MultipleNumbers';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {useGetContacts} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContacts';
import {TeamActions} from '@store/modules/Team/actions';
import {t} from '@translations/i18n';
import {getContactAcronym} from '@utils/contacts';
import {hapticFeedback} from '@utils/hapticFeedback';
import React, {useCallback} from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Contact} from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import {font, rem, screenWidth} from 'rn-units';

export const ContactsList = () => {
  const dispatch = useDispatch();

  const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});

  const sections = useGetContacts();

  const invite = useCallback(
    (id: string) => {
      hapticFeedback();
      dispatch(TeamActions.INVITE_CONTACT.START.create(id));
    },
    [dispatch],
  );

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      section: SectionListData<Contact | User | string, {title: string}>;
    }) => {
      return <SectionHeader section={section} />;
    },
    [],
  );

  const renderItem = useCallback(
    ({
      item,
      index,
      section,
    }: SectionListRenderItemInfo<Contact | User | string, {title: string}>) => {
      if (item === 'InviteFriendsButton') {
        return <InviteButton style={styles.inviteButtonContainer} />;
      }

      if (typeof item !== 'string' && 'phoneNumbers' in item) {
        const multipleNumbers = item.phoneNumbers.length > 1;
        const isIceSection =
          section.title !== t('team.contacts_list.all_contacts');
        return (
          <ContactItem
            index={index}
            phoneNumbers={item.phoneNumbers.map(n => n.number)}
            backgroundColor={'#f0f0f0'} // TODO::generate depending on name
            name={item.givenName}
            leftIconContent={
              <Text style={styles.contactIconText}>
                {getContactAcronym(item)}
              </Text>
            }
            rightSideButton={
              <ContactsInviteButton
                text={t('team.contacts_list.invite')}
                icon={<TeamContactInvite fill={COLORS.darkBlue} />}
                onPress={() => invite(item.recordID)}
              />
            }
            indicatorContent={
              isIceSection ? (
                <View
                  style={[
                    styles.activityIndicatorContainer,
                    {
                      backgroundColor: true
                        ? COLORS.shamrock
                        : COLORS.cadetBlue,
                    },
                  ]}
                />
              ) : multipleNumbers ? (
                <MultipleNumbers />
              ) : null
            }
          />
        );
      }

      return null;
    },
    [invite],
  );

  return (
    <View style={styles.container}>
      <SectionList<Contact | User | string, {title: string}>
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
    width: screenWidth - rem(48),
    marginTop: rem(22),
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
