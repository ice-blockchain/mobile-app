// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {BottomSheetFlatList} from '@components/BottomSheet';
import {ListItemSkeleton} from '@components/ListItems/ListItemSkeleton';
import {
  SKELETONS_PER_SCREEN,
  UserListItem,
} from '@components/ListItems/UserListItem';
import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {WalkthroughReferralItem} from '@screens/Team/components/TierList/components/WalkthroughReferralItem';
import {useAddCollapsedSnapPointListener} from '@screens/Team/components/TierList/hooks/useAddCollapsedSnapPointListener';
import {useFetchReferrals} from '@screens/Team/components/TierList/hooks/useFetchReferrals';
import React, {memo, useCallback, useMemo} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
};

const CONTAINER_PADDING_TOP = rem(16);

export const TierList = memo(
  ({
    referralType,
    emptyTitle,
    focused,
    addCollapsedSnapPointListener,
  }: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle();

    const {bottomSheetRef} = useAddCollapsedSnapPointListener({
      addListener: addCollapsedSnapPointListener,
      referralType,
    });

    const {referrals, loadNext, loadNextLoading, hasNext, refreshing} =
      useFetchReferrals({referralType, focused});

    const renderItem: ListRenderItem<typeof referrals[0]> = useCallback(
      ({item: userId, index}) => {
        if (index === 0 && referralType === 'T1' && focused) {
          return <WalkthroughReferralItem userId={userId} />;
        }
        return (
          <UserListItem
            userId={userId}
            AdditionalInfoComponent={<UserListPingButton userId={userId} />}
          />
        );
      },
      [referralType, focused],
    );

    const Header = useMemo(() => {
      return <ListHeader referralType={referralType} focused={focused} />;
    }, [referralType, focused]);

    return (
      <BottomSheetFlatList
        ref={bottomSheetRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[tabbarOffset.current, styles.container]}
        ListHeaderComponent={Header}
        ListFooterComponent={
          loadNextLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListEmptyComponent={
          hasNext ? (
            <View style={styles.flex}>
              {Array(SKELETONS_PER_SCREEN)
                .fill(null)
                .map((_, index) => (
                  <ListItemSkeleton key={index} />
                ))}
            </View>
          ) : (
            <EmptyTier title={emptyTitle} />
          )
        }
        data={referrals}
        renderItem={renderItem}
        onEndReached={loadNext}
        refreshing={refreshing}
      />
    );
  },
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: CONTAINER_PADDING_TOP,
    flexGrow: 1,
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
