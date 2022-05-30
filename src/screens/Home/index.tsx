// SPDX-License-Identifier: BUSL-1.1

import testIDs from 'e2e/testIDs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PrimaryButton} from '@components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '@store/modules/Auth/actions';
import {RootState} from '@store/rootReducer';

export const Home = () => {
  const {email} = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();
  const logOutPress = () => {
    dispatch(AuthActions.SIGN_OUT.START.create());
  };
  return (
    <View style={styles.container} testID={testIDs.screens.home.screen}>
      <Text style={styles.email} testID="hello">
        {email}
      </Text>
      <PrimaryButton text="Log out" onPress={logOutPress} />
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
  email: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
});
