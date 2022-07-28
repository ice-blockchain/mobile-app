// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {InviteButton} from '@components/InviteButton';
import {UserListItem} from '@components/UserListItem';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {useGetContacts} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContacts';
import {TeamActions} from '@store/modules/Team/actions';
import {hapticFeedback} from '@utils/hapticFeedback';
import React, {useCallback} from 'react';
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {Contact} from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

type Props = {
  focused: boolean;
};

export const ContactsList = ({focused}: Props) => {
  const dispatch = useDispatch();

  const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});

  const sections = useGetContacts(focused);

  const invite = useCallback(
    (id: string) => {
      hapticFeedback();
      dispatch(TeamActions.INVITE_CONTACT.START.create(id));
    },
    [dispatch],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: {title: string}}) => (
      <SectionHeader section={section} />
    ),
    [],
  );

  const renderItem = useCallback(
    ({
      item,
      index,
    }: SectionListRenderItemInfo<Contact | User | string, {title: string}>) => {
      if (typeof item === 'string') {
        if (item === 'InviteFriendsButton') {
          return <InviteButton style={styles.inviteButtonContainer} />;
        } else {
          return null;
        }
      } else if ('recordID' in item) {
        return <ContactItem contact={item} index={index} onInvite={invite} />;
      } else if ('id' in item) {
        return <UserListItem user={item} />;
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
});
