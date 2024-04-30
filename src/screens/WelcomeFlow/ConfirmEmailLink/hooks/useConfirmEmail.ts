// SPDX-License-Identifier: ice License 1.0

import {useCodeInput} from '@components/Inputs/CodeInput/hooks/useCodeInput';
import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  emailSentTimestampSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmail = ({
  signOutOnSuccess,
}: {signOutOnSuccess?: boolean} = {}) => {
  const dispatch = useDispatch();

  // do not subscribe on temporaryEmail so when we erase it ("wrong email"), the UI won't update
  const email = useSelector(temporaryEmailSelector, () => true);

  const validateLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );

  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );

  const validateResult = useSelector(
    actionPayloadSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );

  const emailSentTimestamp = useSelector(emailSentTimestampSelector);

  const resendCode = () => {
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create({email}));
  };

  const resetValidation = useCallback(() => {
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
  }, [dispatch]);

  const validate = (validationCode: string) => {
    dispatch(ValidationActions.EMAIL_VALIDATION.START.create(validationCode));
  };

  const clearError = () => {
    dispatch(ValidationActions.EMAIL_VALIDATION.CLEAR_ERROR.create());
  };

  // clean up on component unmount
  useEffect(() => resetValidation, [resetValidation]);

  useEffect(() => {
    if (isSuccessValidation && signOutOnSuccess) {
      dispatch(AccountActions.SIGN_OUT.START.create());
    }
  }, [dispatch, isSuccessValidation, signOutOnSuccess]);

  const {code, setCode, validationError} = useCodeInput({
    validate,
    resetValidation,
    clearError,
    validateResult,
  });

  return {
    code,
    setCode,
    email,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    emailSentTimestamp,
  };
};
