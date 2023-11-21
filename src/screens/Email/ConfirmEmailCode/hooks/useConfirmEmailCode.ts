// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {isAuthorizedSelector} from '@store/modules/Account/selectors';
import {failedReasonSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  emailVerificationCodeSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailCode = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const email = useSelector(temporaryEmailSelector, () => true);
  const code = useSelector(emailVerificationCodeSelector, () => true);
  const isAuthorized = useSelector(isAuthorizedSelector);
  const action = isAuthorized
    ? AccountActions.MODIFY_EMAIL_WITH_CODE
    : AccountActions.SIGN_IN_EMAIL_CODE;

  const validateError = useSelector(failedReasonSelector.bind(null, action));

  const goBack = useCallback(() => {
    navigation.goBack();
    dispatch(action.RESET.create());
  }, [action.RESET, dispatch, navigation]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          goBack();
          return true;
        },
      );
      return () => subscription.remove();
    }, [goBack]),
  );

  useEffect(() => {
    if (validateError) {
      goBack();
    }
  }, [goBack, validateError]);

  return {
    email,
    code,
    validateError,
    goBack,
  };
};
