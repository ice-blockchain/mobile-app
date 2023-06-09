// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS, WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

const currentStepIndex = WELCOME_STEPS.findIndex(
  step => step.name === 'WhoInvitedYou',
);

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

  const isReferralUpdated = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );

  const updateRefByUsernameLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_REF_BY_USERNAME),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const initialRender = useRef(true);
  const [refUsername, setRefUsername] = useState('');

  const goForward = useCallback(() => {
    navigation.navigate(WELCOME_STEPS[currentStepIndex + 1].name);
  }, [navigation]);

  const goBack = () => {
    resetError();
    navigation.navigate(WELCOME_STEPS[currentStepIndex - 1].name);
  };

  const resetError = () => {
    if (validationError) {
      dispatch(ValidationActions.REF_USERNAME_VALIDATION.RESET.create());
    }
    if (updateRefByUsernameError) {
      dispatch(AccountActions.UPDATE_REF_BY_USERNAME.RESET.create());
    }
    if (updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  };

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
    resetError();
    if (isReferralUpdated) {
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

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (isReferralUpdated) {
      wait(500).then(goForward);
    }
  }, [goForward, isReferralUpdated]);

  return {
    refUsername,
    error: updateError || validationError || updateRefByUsernameError,
    isLoading: updateLoading || updateRefByUsernameLoading,
    isReferralUpdated: isReferralUpdated,
    onChangeRefUsername,
    onSubmit,
    goBack,
  };
};
