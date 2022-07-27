// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/EmptyTier';
import {IceUserItem} from '@screens/Team/components/IceUserItem';
import {ListHeader} from '@screens/Team/components/TierOneList/components/Header';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

// TODO:: add loading
export const TierOneList = () => {
  const dispatch = useDispatch();
  const tabbarOffest = useBottomTabBarOffsetStyle({extraOffset: 20});

  const userId = useSelector(userIdSelector);
  const referrals = useSelector(referralsSelector(userId, 'T1'));

  useEffect(() => {
    dispatch(ReferralsActions.GET_REFERRALS.START.create(userId, 'T1', 0));
  }, [dispatch, userId]);

  const renderItem = useCallback(({item}: {item: User}) => {
    return <IceUserItem user={item} onPress={() => {}} />;
  }, []);

  const Header = useMemo(() => {
    return (
      <ListHeader
        total={referrals?.total ?? 0}
        active={referrals?.active ?? 0}
      />
    );
  }, [referrals?.active, referrals?.total]);

  if (!referrals?.total) {
    return <EmptyTier title={'team.tierOne_tab'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffest.current}
        ListHeaderComponent={Header}
        style={styles.flatListStyle}
        data={referrals.referrals}
        renderItem={renderItem}
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
  flatListStyle: {
    width: screenWidth - rem(48),
    marginTop: 22,
  },
});
