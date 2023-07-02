// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useModifyEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const modifyEmailFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.MODIFY_EMAIL_WITH_LINK),
  );

  const isModifyEmailLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.MODIFY_EMAIL_WITH_LINK),
  );

  const modifyEmail = useCallback(() => {
    Keyboard.dismiss();
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
    dispatch(AccountActions.MODIFY_EMAIL_WITH_LINK.START.create(email));
  }, [dispatch, email]);

  const onChangeEmail = (text: string) => {
    resetError();
    setEmail(text);
  };

  const resetError = () => {
    if (modifyEmailFailedReason) {
      dispatch(AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.create());
    }
  };

  // clean up on component unmount
  useEffect(
    () => () => {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    },
    [dispatch],
  );

  return {
    email,
    onChangeEmail,
    modifyEmail,
    isModifyEmailLoading,
    modifyEmailFailedReason,
  };
};
