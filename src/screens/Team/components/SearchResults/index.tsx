// SPDX-License-Identifier: ice License 1.0

import {TeamUserType, User} from '@api/user/types';
import {BottomSheetSectionList} from '@components/BottomSheet';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactItem} from '@screens/Team/components/Contacts/components/ContactsList/components/ContactItem';
import {
  IceFriendsTitle,
  SectionHeader,
} from '@screens/Team/components/Contacts/components/ContactsList/components/SectionHeader';
import {EmptyList} from '@screens/Team/components/SearchResults/components/EmptyList';
import {
  SearchResultsSection,
  useGetSearchResultsSegments,
} from '@screens/Team/components/SearchResults/hooks/useGetSearchResultsSegments';
import {t} from '@translations/i18n';
import {hapticFeedback} from '@utils/device';
import React, {memo, useCallback} from 'react';
import {SectionListRenderItem, StyleSheet} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEARCH_RESULTS_OFFSET = rem(16);

function getTitleByUserConnection(userConnection: TeamUserType) {
  switch (userConnection) {
    case 'AGENDA':
      return t('team.contacts_list.all_contacts');
    case 'CONTACTS':
      return <IceFriendsTitle />;
    case 'T1':
      return t('users.referralType.T1');
    case 'T2':
      return t('users.referralType.T2');
    case 'TEAM':
      return t('users.referralType.team');
  }
  return null;
}

const VIEW_PORT_ITEMS_SIZE = 12;

export const SearchResults = memo(() => {
  const tabbarOffset = useBottomTabBarOffsetStyle();
  const {sections, searchQuery, loading, refresh, refreshing} =
    useGetSearchResultsSegments();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onInvitePress = useCallback(
    (contact: Contact) => {
      hapticFeedback();
      navigation.navigate('InviteFriend', {contact});
    },
    [navigation],
  );

  const renderItem: SectionListRenderItem<User | Contact, {key: TeamUserType}> =
    useCallback(
      ({item, index}) => {
        if ('recordID' in item) {
          return (
            <ContactItem
              key={item.recordID}
              contact={item}
              index={index}
              onInvite={onInvitePress}
            />
          );
        } else if ('id' in item) {
          return (
            <UserListItem
              key={item.id}
              userId={item.id}
              AdditionalInfoComponent={<UserListPingButton userId={item.id} />}
            />
          );
        }
        return null;
      },
      [onInvitePress],
    );

  const renderSectionHeader = useCallback(
    ({section}: {section: SearchResultsSection}) => (
      <SectionHeader title={getTitleByUserConnection(section.key)} />
    ),
    [],
  );

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        commonStyles.baseSubScreen,
        styles.container,
      ]}
      entering={FadeIn}
      exiting={FadeOut}>
      {sections.length === 0 ? (
        <EmptyList loading={loading} hasSearchQuery={!!searchQuery} />
      ) : (
        <BottomSheetSectionList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tabbarOffset.current}
          keyboardDismissMode={'on-drag'}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          refreshing={refreshing}
          onRefresh={searchQuery ? refresh : null}
          sections={sections}
          initialNumToRender={VIEW_PORT_ITEMS_SIZE}
          windowSize={11}
        />
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    bottom: -2000, // margin-bottom makes pull-to-refresh works wrong
    paddingBottom: 2000,
    zIndex: 1,
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingVertical: rem(24),
  },
});
