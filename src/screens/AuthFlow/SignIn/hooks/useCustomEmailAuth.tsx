// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useCustomEmailAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const emailAuthFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_CUSTOM),
  );

  const isEmailAuthLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.SIGN_IN_EMAIL_CUSTOM),
  );

  const signInWithEmail = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL_CUSTOM.START.create(email));
  };

  return {
    email,
    setEmail,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
  };
};
