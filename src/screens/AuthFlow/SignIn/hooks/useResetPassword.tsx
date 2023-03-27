// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useResetPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const resetPasswordFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_LINK),
  );

  const isResetPasswordLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.SIGN_IN_EMAIL_LINK),
  );

  const resetPassword = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL_LINK.START.create(email));
  };

  return {
    email,
    setEmail,
    resetPassword,
    isResetPasswordLoading,
    resetPasswordFailedReason,
  };
};
