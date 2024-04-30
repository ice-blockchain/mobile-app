// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS, WelcomeStackParamList} from '@navigation/Welcome';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  installReferrerSelector,
  unsafeUserSelector,
} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

export const useWhoInvitedYou = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const updateRefByUsernameError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );
  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const user = useSelector(unsafeUserSelector);

  const installReferrer = useSelector(installReferrerSelector);

  const isReferralVerified = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );

  const isReferralUpdated = isReferralVerified && !!user?.referredBy;

  const updateRefByUsernameLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const [refUsername, setRefUsername] = useState(installReferrer ?? '');

  const resetError = useCallback(() => {
    if (validationError) {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.RESET.create());
    }
    if (updateRefByUsernameError) {
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  }, [dispatch, updateError, updateRefByUsernameError, validationError]);

  const goForward = useCallback(() => {
    const nextStep = WELCOME_STEPS.find(step => !step.finished());
    if (nextStep) {
      navigation.navigate(nextStep.name);
    }
  }, [navigation]);

  const goBack = useCallback(() => {
    resetError();
    navigation.goBack();
  }, [navigation, resetError]);

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
    resetError();
    if (isReferralVerified) {
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (text !== '') {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.START.create(text));
    }
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    resetError();
    dispatch(AccountActions.UPDATE_REF_BY_USERNAME.START.create(refUsername));
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && isReferralUpdated) {
      wait(500).then(goForward);
    }
  }, [isFocused, goForward, isReferralUpdated]);

  return {
    refUsername,
    error: updateError || validationError || updateRefByUsernameError,
    isLoading: updateLoading || updateRefByUsernameLoading,
    isReferralUpdated,
    onChangeRefUsername,
    onSubmit,
    goBack,
  };
};
