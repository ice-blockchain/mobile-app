// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/Buttons/InviteButton';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {EmptyContacts} from '@screens/Team/components/Contacts/components/ContactsList/components/EmptyContacts';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {
  ContactSection,
  ContactSectionDataItem,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {hapticFeedback} from '@utils/device';
import React, {useCallback} from 'react';
import {SectionListRenderItem, StyleSheet, Text} from 'react-native';
import {Contact} from 'react-native-contacts';

export const useContactsListRenderItems = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onInvitePress = useCallback(
    (contact: Contact) => {
      hapticFeedback();
      navigation.navigate('InviteFriend', {contact});
    },
    [navigation],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: ContactSection}) => (
      <SectionHeader title={section.title} />
    ),
    [],
  );

  const renderItem: SectionListRenderItem<
    ContactSectionDataItem,
    ContactSection
  > = useCallback(
    ({item, index}) => {
      if (typeof item === 'string') {
        return (
          <UserListItem
            userId={item}
            AdditionalInfoComponent={<UserListPingButton userId={item} />}
          />
        );
      }

      if ('element' in item) {
        switch (item.element) {
          case 'InviteFriendsButton':
            return <InviteButton style={styles.inviteButtonContainer} />;

          case 'Loading':
            return <ListItemSkeleton />;

          case 'Error':
            return <Text>{item.message}</Text>;

          case 'NoContacts':
            return <EmptyContacts />;
        }
      }

      if ('recordID' in item) {
        return (
          <ContactItem contact={item} index={index} onInvite={onInvitePress} />
        );
      }

      return null;
    },
    [onInvitePress],
  );

  return {renderSectionHeader, renderItem};
};

const styles = StyleSheet.create({
  inviteButtonContainer: {
    marginHorizontal: 0,
  },
});
