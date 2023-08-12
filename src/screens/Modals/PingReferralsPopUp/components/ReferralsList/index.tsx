// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {
  POPUP_SIDE_OFFSET,
  SCREEN_SIDE_OFFSET,
  windowWidth,
} from '@constants/styles';
import {ReferralsListItemDone} from '@screens/Modals/PingReferralsPopUp/components/ReferralsListItemDone';
import {referralsToPingSelector} from '@store/modules/Referrals/selectors';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ListRenderItem, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ReferralsList = memo(() => {
  const {data} = useSelector(referralsToPingSelector({referralType: 'T1'}));

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    /** 1 sec timeout so user can see
     * done state for already pinged item
     */
    setTimeout(() => {
      setLocalData(data);
    }, 1000);
  }, [data]);

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
      data={localData.slice(0, 4)}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    width: windowWidth - POPUP_SIDE_OFFSET * 2,
  },
});
