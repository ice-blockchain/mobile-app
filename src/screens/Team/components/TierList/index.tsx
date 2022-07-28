// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {UserListItem, UserListItemSkeleton} from '@components/UserListItem';
import {UserListItemButton} from '@components/UserListItem/components/UserListItemButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {PingIcon} from '@svg/PingIcon';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
  focused: boolean;
};

export const TierList = memo(
  ({referralType, emptyTitle, headerTitle, focused}: Props) => {
    const dispatch = useDispatch();
    const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});

    const userId = useSelector(userIdSelector);
    const referrals = useSelector(referralsSelector(userId, referralType));

    const failderReason = useSelector(
      failedReasonSelector.bind(
        null,
        ReferralsActions.GET_REFERRALS(referralType),
      ),
    );

    //TDOO::add pagination
    useEffect(() => {
      if (focused) {
        dispatch(
          ReferralsActions.GET_REFERRALS(referralType).START.create(
            userId,
            referralType,
            0,
          ),
        );
      }
    }, [dispatch, referralType, userId, focused]);

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

    if (failderReason) {
      //TODO::error handling (component?)
      return <Text>{failderReason}</Text>;
    }

    if (!referrals && !failderReason) {
      return (
        <>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <UserListItemSkeleton key={index} />
            ))}
        </>
      );
    }

    if (!referrals?.total) {
      return <EmptyTier title={emptyTitle} />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tabbarOffset.current}
          ListHeaderComponent={Header}
          style={styles.flatListStyle}
          data={referrals.referrals}
          renderItem={renderItem}
        />
      </View>
    );
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
});
