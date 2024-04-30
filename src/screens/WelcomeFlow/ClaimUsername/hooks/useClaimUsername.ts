// SPDX-License-Identifier: ice License 1.0

import {WELCOME_STEPS, WelcomeStackParamList} from '@navigation/Welcome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  unsafeUserSelector,
  userInfoSelector,
} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

export const useClaimUsername = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();
  const user = useSelector(unsafeUserSelector);

  const userInfo = useSelector(userInfoSelector);

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const initialRender = useRef(true);
  const [username, setUsername] = useState(
    user.username ?? userInfo?.userHandle ?? '',
  );

  const isUsernameUpdated = !!username && username === user.username;

  const goForward = useCallback(() => {
    const nextStep = WELCOME_STEPS.find(step => !step.finished());
    if (nextStep) {
      navigation.navigate(nextStep.name);
    }
  }, [navigation]);

  const goBack = useCallback(() => {
    dispatch(AccountActions.SIGN_OUT.START.create());
  }, [dispatch]);

  const resetError = useCallback(() => {
    if (validationError) {
      dispatch(ValidationActions.USERNAME_VALIDATION.RESET.create());
    }
    if (updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  }, [dispatch, updateError, validationError]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (isUsernameUpdated) {
      goForward();
    } else {
      dispatch(AccountActions.UPDATE_ACCOUNT.START.create({username}));
    }
  };

  const onChangeUsername = (text: string) => {
    setUsername(text);
    resetError();
    if (text !== '') {
      dispatch(ValidationActions.USERNAME_VALIDATION.START.create(text));
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    wait(500).then(goForward);
  }, [goForward, user.username]);

  return {
    username,
    error: updateError || validationError,
    isLoading: updateLoading,
    isUsernameUpdated,
    onChangeUsername,
    onSubmit,
    goBack,
  };
};
