// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');

  const resetPasswordFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.RESET_PASSWORD),
  );

  const isResetPasswordLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.RESET_PASSWORD),
  );

  const isResetPasswordSuccess = useSelector(
    isSuccessSelector.bind(null, AccountActions.RESET_PASSWORD),
  );

  const resetPasswordButtonPressedRef = useRef(false);
  const resetPassword = () => {
    resetPasswordButtonPressedRef.current = true;
    dispatch(AccountActions.RESET_PASSWORD.START.create({email}));
  };

  useEffect(() => {
    if (isResetPasswordSuccess && resetPasswordButtonPressedRef.current) {
      navigation.navigate('ResetPasswordLink', {email});
      resetPasswordButtonPressedRef.current = false;
    }
  }, [email, isResetPasswordSuccess, navigation]);

  return {
    email,
    setEmail,
    resetPassword,
    isResetPasswordLoading,
    resetPasswordFailedReason,
  };
};
