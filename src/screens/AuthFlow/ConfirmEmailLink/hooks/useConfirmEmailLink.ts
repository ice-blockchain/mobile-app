// SPDX-License-Identifier: ice License 1.0

import {AuthStackParamList} from '@navigation/Auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  processStatusForActionSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {temporaryEmailSelector} from '@store/modules/Validation/selectors';
import {RootState} from '@store/rootReducer';
import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailLink = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const email = useSelector(temporaryEmailSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_LINK),
  );

  const validateLoading = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, AccountActions.SIGN_IN_EMAIL_LINK)
        ?.status === 'CONFIRM_TEMP_EMAIL',
  );

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

  useEffect(() => {
    if (validateError) {
      navigation.replace('InvalidLink');
    }
  }, [validateError, navigation]);

  return {
    email,
    validateError,
    validateLoading,
    goBack,
  };
};
