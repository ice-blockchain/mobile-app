// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {UserListItem, UserListItemSkeleton} from '@components/UserListItem';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {SectionHeader} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {
  ContactSection,
  ContactSectionDataItem,
  useGetContactSegments,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {TeamActions} from '@store/modules/Team/actions';
import {hapticFeedback} from '@utils/hapticFeedback';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
};

export const ContactsList = ({focused}: Props) => {
  const dispatch = useDispatch();

  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {sections, loadNext, loadNextLoading, refresh, refreshing} =
    useGetContactSegments(focused);

  const invite = useCallback(
    (id: string) => {
      hapticFeedback();
      dispatch(TeamActions.INVITE_CONTACT.START.create(id));
    },
    [dispatch],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: ContactSection}) => (
      <SectionHeader section={section} />
    ),
    [],
  );

  const renderItem = useCallback(
    ({
      item,
      index,
    }: SectionListRenderItemInfo<ContactSectionDataItem, ContactSection>) => {
      if ('element' in item) {
        if (item.element === 'InviteFriendsButton') {
          return <InviteButton style={styles.inviteButtonContainer} />;
        } else if (item.element === 'Loading') {
          return <UserListItemSkeleton />;
        } else if (item.element === 'Error') {
          return <Text>{item.message}</Text>;
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
      <SectionList<ContactSectionDataItem, ContactSection>
        contentContainerStyle={tabbarOffset.current}
        style={styles.sectionListStyle}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={loadNextLoading ? ActivityIndicator : null}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNext}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  sectionListStyle: {
    marginTop: rem(10),
  },
  inviteButtonContainer: {
    marginHorizontal: 0,
  },
});
