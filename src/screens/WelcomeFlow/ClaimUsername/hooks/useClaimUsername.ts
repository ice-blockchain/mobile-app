// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
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
  const user = useSelector(userSelector) as User;

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const initialUsername = useRef(user.username);
  const [username, setUsername] = useState(user.username);
  const [waitLoading, setWaitLoading] = useState(false);

  const isUsernameUpdated =
    !!username && username.toLowerCase() === user.username?.toLowerCase();

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!isUsernameUpdated) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({username: username}),
      );
    } else {
      finalizeStep(user);
    }
  };

  const onChangeUsername = (text: string) => {
    setUsername(text);
    resetError();
    if (text !== '') {
      dispatch(ValidationActions.USERNAME_VALIDATION.START.create(text));
    }
  };

  const onBack = () => {
    dispatch(AccountActions.SIGN_OUT.START.create());
  };

  const resetError = () => {
    if (validationError) {
      dispatch(ValidationActions.USERNAME_VALIDATION.RESET.create());
    }
    if (updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  };

  const finalizeStep = useCallback(
    (currentUser: User) => {
      const finalizedSteps =
        currentUser.clientData?.registrationProcessFinalizedSteps ?? [];

      const steps = [...finalizedSteps];
      if (!finalizedSteps.includes('username')) {
        steps.push('username');
      }
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: steps,
            },
          },
          function* (freshUser) {
            if (
              !freshUser.clientData?.registrationProcessFinalizedSteps?.includes(
                'username',
              )
            ) {
              finalizeStep(freshUser);
            }
            return {retry: false};
          },
        ),
      );
      dispatch(ValidationActions.USERNAME_VALIDATION.RESET.create());
    },
    [dispatch],
  );

  useEffect(() => {
    if (user.username !== initialUsername.current) {
      initialUsername.current = user.username;
      /**
       * Small delay here so User can see the update result
       * (green mark) inside text input, before we go forward
       */
      setWaitLoading(true);
      wait(500).then(() => {
        finalizeStep(user);
        setWaitLoading(false);
      });
    }
  }, [finalizeStep, user]);

  return {
    username,
    error: updateError || validationError,
    isLoading: updateLoading || waitLoading,
    isUsernameUpdated,
    onChangeUsername,
    onSubmit,
    onBack,
  };
};
