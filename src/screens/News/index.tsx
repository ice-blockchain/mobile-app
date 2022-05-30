// SPDX-License-Identifier: BUSL-1.1

import {NewsActions} from '@store/modules/News/actions';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

export const News = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(NewsActions.NEWS_LOAD.START.create({isRefresh: true}));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
