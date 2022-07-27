// SPDX-License-Identifier: BUSL-1.1

import {ReferralType, User} from '@api/user/types';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/TierList/components/EmptyTier';
import {ListHeader} from '@screens/Team/components/TierList/components/Header';
import {IceUserItem} from '@screens/Team/components/TierList/components/IceUserItem';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

type Props = {
  referralType: ReferralType;
  emptyTitle: string;
  headerTitle: string;
};

// TODO:: add loading
export const TierList = memo(
  ({referralType, emptyTitle, headerTitle}: Props) => {
    const dispatch = useDispatch();
    const tabbarOffset = useBottomTabBarOffsetStyle({extraOffset: 20});

    const userId = useSelector(userIdSelector);
    const referrals = useSelector(referralsSelector(userId, referralType));

    useEffect(() => {
      dispatch(
        ReferralsActions.GET_REFERRALS.START.create(userId, referralType, 0),
      );
    }, [dispatch, referralType, userId]);

    const renderItem = useCallback(({item}: {item: User}) => {
      return <IceUserItem user={item} onPress={() => {}} />;
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
    marginTop: 22,
  },
});
