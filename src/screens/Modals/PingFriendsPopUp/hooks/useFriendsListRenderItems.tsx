// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import {rem} from 'rn-units';

export const useFriendsListRenderItems = () => {
  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return (
      <UserListItem
        userId={item}
        showFlag={false}
        AdditionalInfoComponent={
          <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
        }
      />
    );
  }, []);

  return {renderItem};
};
