// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {useFriendsListRenderItems} from '@screens/Modals/PingFriendsPopUp/hooks/useFriendsListRenderItems';
import {ReferralsActions} from '@store/modules/Referrals/actions';
import {referralsSelector} from '@store/modules/Referrals/selectors';
import React, {memo, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

export const FriendsList = memo(() => {
  const {fetch, data: referrals} = useFetchCollection(
    useMemo(
      () => ({
        selector: referralsSelector({referralType: 'T1'}),
        action: ReferralsActions.GET_REFERRALS({referralType: 'T1'})('T1'),
      }),
      [],
    ),
  );

  const {renderItem} = useFriendsListRenderItems();

  useEffect(() => {
    fetch({isInitial: true});
  }, [fetch]);

  //TODO: handle pagination
  //   if (referrals.length < 2 && !hasNext) {
  //     return null;
  //   }

  let data: string[] = [];
  if (referrals.length) {
    if (referrals.length > 4) {
      data = referrals.slice(0, 4);
    } else {
      data = referrals;
    }
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.memberContent}
      />
    </>
  );
});

const styles = StyleSheet.create({
  separator: {
    marginEnd: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    flexGrow: 1,
    flexDirection: 'column',
  },
  activityIndicator: {
    marginLeft: rem(10),
  },
});
