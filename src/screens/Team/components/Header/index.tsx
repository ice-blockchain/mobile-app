// SPDX-License-Identifier: BUSL-1.1

import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  InfoItem,
  InfoItemType,
} from '@screens/Team/components/Header/components/InfoItem';
import {Search} from '@screens/Team/components/Header/components/Search';
import {TeamActions} from '@store/modules/Team/actions';
import debounce from 'lodash/debounce';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

export const Header = () => {
  const dispatch = useDispatch();

  const search = debounce((searchQuery: string) => {
    dispatch(TeamActions.SEARCH_USERS.START.create(searchQuery));
  }, 600);

  return (
    <View style={styles.container}>
      <Search onChangeText={search} />
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
