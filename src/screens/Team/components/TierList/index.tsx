// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {UserListItem, UserListItemSkeleton} from '@components/UserListItem';
import {UserListItemButton} from '@components/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {useReferrals} from '@screens/Team/components/TierList/hooks/useReferrals';
import {PingIcon} from '@svg/PingIcon';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
};

export const TierList = memo(
  ({referralType, emptyTitle, headerTitle, focused}: Props) => {
    const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});
    const {referrals, error, loadNext} = useReferrals(referralType, focused);

    const renderItem = useCallback(({item}: {item: User}) => {
      return (
        <UserListItem
          user={item}
          rightButton={
            <UserListItemButton
              disabled={item.pinged}
              icon={
                <PingIcon
                  fill={item.pinged ? COLORS.cadetBlue : COLORS.darkBlue}
                />
              }
              text={t('team.tier_one.ping')}
              onPress={() => {}}
            />
          }
        />
      );
    }, []);

    const Header = useMemo(() => {
      return (
        <ListHeader
          total={referrals?.total ?? 0}
          active={referrals?.active ?? 0}
          title={headerTitle}
        />
      );
    }, [referrals?.total, referrals?.active, headerTitle]);

    if (!referrals) {
      if (error) {
        //TODO::error handling (component?)
        return <Text>{error}</Text>;
      } else {
        return (
          <View style={styles.loadingContainer}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <UserListItemSkeleton key={index} />
              ))}
          </View>
        );
      }
    } else {
      if (!referrals.total) {
        return <EmptyTier title={emptyTitle} />;
      } else {
        return (
          <View style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tabbarOffset.current}
              ListHeaderComponent={Header}
              style={styles.flatListStyle}
              data={referrals.referrals}
              renderItem={renderItem}
              onEndReached={loadNext}
            />
          </View>
        );
      }
    }
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  flatListStyle: {
    width: screenWidth - rem(48),
    marginTop: rem(22),
  },
  loadingContainer: {
    marginTop: rem(22),
  },
});
