// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ReferralsListItemDone} from '@screens/Modals/PingReferralsPopUp/components/ReferralsListItemDone';
import {
  MAX_PINGED_REFS,
  referralsToShowForPingSelector,
} from '@store/modules/Referrals/selectors';
import React, {memo, useCallback} from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ReferralsList = memo(() => {
  const {data} = useSelector(
    referralsToShowForPingSelector({referralType: 'T1'}),
  );

  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return (
      <UserListItem
        userId={item}
        showFlag={false}
        AdditionalInfoComponent={<ReferralsListItemDone userId={item} />}
      />
    );
  }, []);

  return (
    <FlatList
      data={data.slice(0, MAX_PINGED_REFS)}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
  },
});
