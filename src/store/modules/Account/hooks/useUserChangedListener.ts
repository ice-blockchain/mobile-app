// SPDX-License-Identifier: ice License 1.0

import {onUserChanged} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const useUserChangedListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return onUserChanged(() => {
      dispatch(AccountActions.USER_STATE_CHANGE.START.create());
    });
  }, [dispatch]);
};
