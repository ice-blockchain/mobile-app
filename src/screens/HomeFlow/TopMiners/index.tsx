// SPDX-License-Identifier: ice License 1.0

import {Miner} from '@api/statistics/types';
import {UserListItemCompact} from '@components/ListItems/UserListItemCompact';
import {Touchable} from '@components/Touchable';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CollectionList} from '@screens/Templates/CollectionList';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {uniqueId} from 'lodash';
import React, {memo, useCallback} from 'react';

export const TopMiners = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const renderListItem = useCallback(
    ({item}: {item: Miner}) => (
      <Touchable
        key={item.userId ?? uniqueId()}
        onPress={() => {
          if (item.userId) {
            navigation.navigate('UserProfile', {userId: item.userId!});
          }
        }}>
        <UserListItemCompact
          name={item.username}
          profilePictureUrl={item.profilePictureUrl}
          iceAmount={formatNumber(item.balance, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        />
      </Touchable>
    ),
    [navigation],
  );

  return (
    <CollectionList
      headerTitle={t('stats.top_miners')}
      searchPlaceholder={t('search.search_for_users')}
      selector={collectionSelector('minersSearch')}
      action={CollectionActions.SEARCH_MINERS}
      renderItem={renderListItem}
    />
  );
});
