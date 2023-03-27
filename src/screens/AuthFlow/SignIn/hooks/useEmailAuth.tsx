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

export const useEmailAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailFlow: 'password' | 'link' = 'password'; // TODO: set depending on device.lang

  const action =
    emailFlow === 'password'
      ? AccountActions.SIGN_IN_EMAIL_PASSWORD
      : AccountActions.SIGN_IN_EMAIL_LINK;

  const emailAuthFailedReason = useSelector(
    failedReasonSelector.bind(null, action),
  );

  const emailAuthFailedReasonPayload = useSelector(
    actionPayloadSelector.bind(null, action),
  );

  const failedField =
    emailAuthFailedReason && checkProp(emailAuthFailedReasonPayload, 'field')
      ? emailAuthFailedReasonPayload.field
      : null;

  const isEmailAuthLoading = useSelector(isLoadingSelector.bind(null, action));

  const signInWithEmail = () => {
    if (emailFlow === 'password') {
      dispatch(
        AccountActions.SIGN_IN_EMAIL_PASSWORD.START.create({email, password}),
      );
    } else {
      dispatch(AccountActions.SIGN_IN_EMAIL_LINK.START.create(email));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailFlow,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
    failedField,
  };
};
