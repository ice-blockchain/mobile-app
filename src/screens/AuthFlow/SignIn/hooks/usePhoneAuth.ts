// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const usePhoneAuth = () => {
  const dispatch = useDispatch();
  const [phoneNumberBody, setPhoneNumberBody] = useState('');
  const [countryIsoCode, setCountryIsoCode] = useState('');
  const fullPhoneRef = useRef('');

  const phoneAuthFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const isPhoneAuthLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const resetError = () => {
    if (phoneAuthFailedReason) {
      dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
    }
  };

  const signInWithPhoneNumber = () =>
    dispatch(
      AccountActions.SIGN_IN_PHONE.START.create(
        fullPhoneRef.current,
        countryIsoCode,
      ),
    );

  const onChangePhone = (
    phoneBody: string,
    iddCode: string,
    isoCode: string,
  ) => {
    resetError();
    setCountryIsoCode(isoCode);
    setPhoneNumberBody(phoneBody);
    fullPhoneRef.current = `${iddCode}${phoneBody}`;
  };

  return {
    phoneNumberBody,
    onChangePhone,
    signInWithPhoneNumber,
    isPhoneAuthLoading,
    phoneAuthFailedReason,
  };
};
