// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useCancelRequest} from '@hooks/useCancelRequest';
import {InfoItem, InfoItemType} from '@screens/Team/components/InfoItem';
import {Search} from '@screens/Team/components/Search';
import {TeamActions} from '@store/modules/Team/actions';
import {throttle} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

export const Header = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const signal: AbortSignal = useCancelRequest();

  const search = throttle((searchQuery: string) => {
    dispatch(TeamActions.SEARCH_USERS.START.create(searchQuery, signal));
  }, 600);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(search, []);

  useEffect(() => {
    onSearch(query);
  }, [onSearch, query]);

  return (
    <View style={styles.container}>
      <Search value={query} onChangeText={setQuery} />
      <View style={styles.infoItems}>
        <InfoItem type={InfoItemType.referrals} />
        <InfoItem type={InfoItemType.earnings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  infoItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
