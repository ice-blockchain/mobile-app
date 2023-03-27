// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect} from '@react-navigation/native';
import {AccountActions} from '@store/modules/Account/actions';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch} from 'react-redux';

export const useBackHandler = () => {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL_LINK.RESET.create());
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          dispatch(AccountActions.SIGN_IN_EMAIL_LINK.RESET.create());
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch]),
  );

  return {
    goBack,
  };
};
