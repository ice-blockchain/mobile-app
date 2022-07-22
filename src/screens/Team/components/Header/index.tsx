// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {InfoItem, InfoItemType} from '@screens/Team/components/InfoItem';
import {Search} from '@screens/Team/components/Search';
import {TeamActions} from '@store/modules/Team/actions';
import debounce from 'lodash/debounce';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

export const Header = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const search = debounce((searchQuery: string) => {
    dispatch(TeamActions.SEARCH_USERS.START.create(searchQuery));
  }, 600);

  const onSearch = (text: string) => {
    setQuery(text);
    search(text);
  };

  return (
    <View style={styles.container}>
      <Search value={query} onChangeText={onSearch} />
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
