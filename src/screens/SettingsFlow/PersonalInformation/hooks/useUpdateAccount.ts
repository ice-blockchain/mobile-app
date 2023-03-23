// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useUpdateAccount = (userInfo: Partial<User>) => {
  const dispatch = useDispatch();

  const updateAccount = () => {
    Keyboard.dismiss();
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create(userInfo));
  };

  const isUpdateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  return {
    updateAccount,
    isUpdateLoading,
  };
};
