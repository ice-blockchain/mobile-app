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
  smsSentTimestampSelector,
  temporaryPhoneNumberSelector,
} from '@store/modules/Validation/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  onModifyPhoneNumber?: () => void;
};

export const useConfirmPhoneNumber = ({onModifyPhoneNumber}: Props) => {
  const resetValidationOnGoBack = !onModifyPhoneNumber;
  const dispatch = useDispatch();

  const phoneNumber = useSelector(temporaryPhoneNumberSelector, () => true);

  const validateLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  const validateResult = useSelector(
    actionPayloadSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  const smsSentTimestamp = useSelector(smsSentTimestampSelector);

  const resendCode = () => {
    if (phoneNumber) {
      dispatch(AccountActions.VERIFY_PHONE_NUMBER.START.create(phoneNumber));
    }
  };

  const resetValidation = useCallback(() => {
    dispatch(ValidationActions.PHONE_VALIDATION.RESET.create());
  }, [dispatch]);

  const validate = (validationCode: string) => {
    dispatch(ValidationActions.PHONE_VALIDATION.START.create(validationCode));
  };

  const clearError = () => {
    dispatch(ValidationActions.PHONE_VALIDATION.CLEAR_ERROR.create());
  };

  const {code, setCode, validationError} = useCodeInput({
    validate,
    resetValidation: resetValidationOnGoBack
      ? resetValidation
      : onModifyPhoneNumber,
    clearError,
    validateResult,
  });

  return {
    code,
    setCode,
    phoneNumber,
    resendCode,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
    clearError,
  };
};
