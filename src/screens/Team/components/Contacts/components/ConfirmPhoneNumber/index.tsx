// SPDX-License-Identifier: ice License 1.0

import {ConfirmPhoneNumberForm} from '@components/Forms/ConfirmPhoneNumberForm';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Account/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {temporaryPhoneNumberSelector} from '@store/modules/Validation/selectors';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const ConfirmPhoneNumber = () => {
  const dispatch = useDispatch();

  const temporaryPhoneNumber = useSelector(temporaryPhoneNumberSelector);
  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);

  const resetTempPhoneNumber = () => {
    dispatch(ValidationActions.PHONE_VALIDATION.RESET.create());
  };

  const onModifyPhoneNumber = () => {
    dispatch(
      ValidationActions.SET_TEMPORARY_PHONE_VERIFICATION_STEP.STATE.create({
        temporaryPhoneVerificationStep: 'phone',
      }),
    );
  };

  useEffect(() => {
    if (isPhoneNumberVerified && temporaryPhoneNumber) {
      dispatch(ValidationActions.PHONE_VALIDATION.RESET.create());
    }
  }, [temporaryPhoneNumber, isPhoneNumberVerified, dispatch]);

  return (
    <ConfirmPhoneNumberForm
      onDoThisLater={resetTempPhoneNumber}
      onModifyPhoneNumber={onModifyPhoneNumber}
    />
  );
};
