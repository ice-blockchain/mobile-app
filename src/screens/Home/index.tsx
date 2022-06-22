// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {AuthActions} from '@store/modules/Auth/actions';
import {RootState} from '@store/rootReducer';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const Home = () => {
  const {email} = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();
  const logOutPress = async () => {
    dispatch(AuthActions.SIGN_OUT.START.create());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.email}>{email}</Text>
      <PrimaryButton text="Log out" onPress={logOutPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  email: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
});
