// SPDX-License-Identifier: ice License 1.0

import {UserListItem} from '@components/ListItems/UserListItem';
import {COLORS} from '@constants/colors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import React, {useCallback} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const useFriendsListRenderItems = () => {
  const renderItem: ListRenderItem<string> = useCallback(({item}) => {
    return (
      <UserListItem
        userId={item}
        showFlag={false}
        AdditionalInfoComponent={
          <View style={[styles.iconContainer, styles.completed]}>
            <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
          </View>
        }
      />
    );
  }, []);

  return {renderItem};
};

const styles = StyleSheet.create({
  iconContainer: {
    width: rem(20),
    height: rem(20),
    borderRadius: rem(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: COLORS.shamrock,
  },
});
