// SPDX-License-Identifier: ice License 1.0

import {TeamUserType, User} from '@api/user/types';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {UserListItem} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {COLORS} from '@constants/colors';
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
import {SEARCH_HEIGHT} from '@screens/Team/components/Header/components/Search';
import {
  SearchResultsSection,
  useGetSearchResultsSegments,
} from '@screens/Team/components/SearchResults/hooks/useGetSearchResultsSegments';
import {MagnifierZoomOutEmptyIcon} from '@svg/MagnifierZoomOutEmptyIcon';
import {MagnifierZoomOutIcon} from '@svg/MagnifierZoomOutIcon';
import {t} from '@translations/i18n';
import {hapticFeedback} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const SEARCH_RESULTS_OFFSET = rem(16);
const ICON_SIZE = rem(28);

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
  }
  return null;
}

const VIEW_PORT_ITEMS_SIZE = 12;

export const SearchResults = memo(() => {
  const tabbarOffset = useBottomTabBarOffsetStyle({
    extraOffset: SEARCH_HEIGHT + rem(64),
  });
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

  const renderEmptyList = useCallback(() => {
    if (!searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <MagnifierZoomOutIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            color={COLORS.secondary}
          />
          <Text style={styles.emptyContainerText}>{t('search.empty')}</Text>
        </View>
      );
    }
    if (loading) {
      return (
        <>
          {Array(VIEW_PORT_ITEMS_SIZE)
            .fill(null)
            .map((_, index) => (
              <ListItemSkeleton key={index} />
            ))}
        </>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <MagnifierZoomOutEmptyIcon
          width={ICON_SIZE}
          height={ICON_SIZE}
          color={COLORS.secondary}
        />
        <Text style={styles.emptyContainerText}>
          {t('search.nothing_is_found')}
        </Text>
      </View>
    );
  }, [loading, searchQuery]);

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
      <SectionList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffset.current}
        keyboardDismissMode={'on-drag'}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={renderEmptyList}
        refreshing={refreshing}
        onRefresh={searchQuery ? refresh : () => {}}
        sections={sections}
        initialNumToRender={VIEW_PORT_ITEMS_SIZE}
      />
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rem(200),
  },
  emptyContainerText: {
    ...font(14, 17, 'medium', 'secondary'),
    textAlign: 'center',
    paddingTop: rem(16),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
});
