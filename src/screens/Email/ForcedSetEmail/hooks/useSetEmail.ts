// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {emailVerificationStepSelector} from '@store/modules/Validation/selectors';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSetEmail = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const emailVerificationStep = useSelector(emailVerificationStepSelector);
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.MODIFY_EMAIL_WITH_CODE),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.MODIFY_EMAIL_WITH_CODE),
  );

  const [email, setEmail] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onSubmitPress = useCallback(() => {
    Keyboard.dismiss();
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
    dispatch(AccountActions.MODIFY_EMAIL_WITH_CODE.START.create(email));
  }, [dispatch, email]);

  useEffect(() => {
    if (emailVerificationStep === 'code') {
      navigation.navigate('ForcedConfirmEmail');
    }
  }, [navigation, emailVerificationStep]);

  return {
    email,
    onChangeEmail,
    updateError,
    updateLoading,
    onSubmitPress,
  };
};
