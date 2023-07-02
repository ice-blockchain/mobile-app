// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {useIsCustomEmailFlow} from '@store/modules/Account/hooks/useIsCustomEmailFlow';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useModifyEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const isCustomEmailFlow = useIsCustomEmailFlow();
  const action = isCustomEmailFlow
    ? AccountActions.MODIFY_EMAIL_WITH_CODE
    : AccountActions.MODIFY_EMAIL_WITH_LINK;

  const modifyEmailFailedReason = useSelector(
    failedReasonSelector.bind(null, action),
  );

  const isModifyEmailLoading = useSelector(
    isLoadingSelector.bind(null, action),
  );

  const modifyEmail = useCallback(() => {
    Keyboard.dismiss();
    dispatch(action.START.create(email));
  }, [action, dispatch, email]);

  const onChangeEmail = (text: string) => {
    resetError();
    setEmail(text);
  };

  const resetError = () => {
    if (modifyEmailFailedReason) {
      dispatch(action.RESET.create());
    }
  };

  // clean up on component unmount
  useEffect(
    () => () => {
      dispatch(action.RESET.create());
    },
    [action, dispatch],
  );

  return {
    email,
    onChangeEmail,
    modifyEmail,
    isModifyEmailLoading,
    modifyEmailFailedReason,
  };
};
