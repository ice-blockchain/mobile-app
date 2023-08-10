// SPDX-License-Identifier: ice License 1.0

import {
  POPUP_SIDE_OFFSET,
  SCREEN_SIDE_OFFSET,
  windowWidth,
} from '@constants/styles';
import {useFriendsListRenderItems} from '@screens/Modals/PingFriendsPopUp/hooks/useFriendsListRenderItems';
import {referralsToPingSelector} from '@store/modules/Referrals/selectors';
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const FriendsList = memo(() => {
  const {data} = useSelector(referralsToPingSelector({referralType: 'T1'}));

  const [localData, setLocalData] = useState(data);

  const {renderItem} = useFriendsListRenderItems();

  useEffect(() => {
    /** 1 sec timeout so user can see
     * done state for already pinged item
     */
    setTimeout(() => {
      setLocalData(data);
    }, 1000);
  }, [data]);

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
