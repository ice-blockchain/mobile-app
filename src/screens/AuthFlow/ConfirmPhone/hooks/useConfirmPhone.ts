// SPDX-License-Identifier: ice License 1.0

import {useCodeInput} from '@components/Inputs/CodeInput/hooks/useCodeInput';
import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  isSuccessSelector,
  processStatusForActionSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  smsSentTimestampSelector,
  temporaryPhoneNumberSelector,
} from '@store/modules/Validation/selectors';
import {RootState} from '@store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmPhone = () => {
  const dispatch = useDispatch();

  const phoneNumber = useSelector(temporaryPhoneNumberSelector, () => true);

  const validateLoading = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, AccountActions.SIGN_IN_PHONE)
        ?.status === 'CONFIRM_TEMP_PHONE',
  );

  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const validateResult = useSelector(
    actionPayloadSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const smsSentTimestamp = useSelector(smsSentTimestampSelector);

  const validate = (validationCode: string) => {
    dispatch(
      AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create(validationCode),
    );
  };

  const clearError = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.CLEAR_ERROR.create());
  };

  const resendCode = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.RESEND.create());
  };

  const resetValidation = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
  };

  const {code, setCode, validationError} = useCodeInput({
    validate,
    resetValidation,
    clearError,
    validateResult,
  });

  return {
    code,
    setCode,
    phoneNumber,
    resendCode,
    resetValidation,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
  };
};
