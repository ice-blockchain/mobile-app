// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {debounce} from 'lodash';
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useValidateUsername = (user: User, username = '') => {
  const dispatch = useDispatch();

  const validateUsernameError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const validateUsernameLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const validateUsernameSuccess = useSelector(
    isSuccessSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );

  const validateUsername = useMemo(
    () =>
      debounce((text: string) => {
        if (text) {
          if (user.username?.toLowerCase() === text.toLowerCase()) {
            dispatch(ValidationActions.USERNAME_VALIDATION.CLEAR.create());
          } else {
            dispatch(ValidationActions.USERNAME_VALIDATION.START.create(text));
          }
        }
      }, 600),
    [dispatch, user.username],
  );

  useEffect(() => {
    dispatch(ValidationActions.USERNAME_VALIDATION.CLEAR.create());
    validateUsername(username);
  }, [dispatch, username, validateUsername]);

  return {
    validateUsernameError,
    validateUsernameLoading,
    validateUsernameSuccess,
  };
};
