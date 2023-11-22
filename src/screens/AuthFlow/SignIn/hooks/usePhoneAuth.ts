// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {RootState} from '@store/rootReducer';
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

  // Listening to SIGN_IN_EMAIL_CODE and SIGN_IN_EMAIL_LINK because
  // starting the phone flow may lead to starting email flow if the
  // former is blocked by auth config
  const isPhoneAuthLoading = useSelector(
    (state: RootState) =>
      isLoadingSelector(AccountActions.SIGN_IN_PHONE, state) ||
      isLoadingSelector(AccountActions.SIGN_IN_EMAIL_CODE, state) ||
      isLoadingSelector(AccountActions.SIGN_IN_EMAIL_LINK, state),
  );

  const resetError = () => {
    if (phoneAuthFailedReason) {
      dispatch(AccountActions.SIGN_IN_PHONE.RESET);
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
