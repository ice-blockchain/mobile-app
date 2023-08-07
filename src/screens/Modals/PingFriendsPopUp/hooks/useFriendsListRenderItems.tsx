// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {FriendsListItemDone} from '@screens/Modals/PingFriendsPopUp/components/FriendsListItemDone';
import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';

export const useFriendsListRenderItems = () => {
  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return (
      <UserListItem
        userId={item}
        showFlag={false}
        AdditionalInfoComponent={<FriendsListItemDone userId={item} />}
      />
    );
  }, []);

  return {renderItem};
};
