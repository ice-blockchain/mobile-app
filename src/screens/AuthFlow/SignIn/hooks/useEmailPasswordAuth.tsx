// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {checkProp} from '@utils/guards';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useEmailPasswordAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailAuthFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL_PASSWORD),
  );

  const emailAuthFailedReasonPayload = useSelector(
    actionPayloadSelector.bind(null, AccountActions.SIGN_IN_EMAIL_PASSWORD),
  );

  const failedField =
    emailAuthFailedReason && checkProp(emailAuthFailedReasonPayload, 'field')
      ? emailAuthFailedReasonPayload.field
      : null;

  const isEmailAuthLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.SIGN_IN_EMAIL_PASSWORD),
  );

  const signInWithEmail = () => {
    dispatch(
      AccountActions.SIGN_IN_EMAIL_PASSWORD.START.create({email, password}),
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
    failedField,
  };
};
