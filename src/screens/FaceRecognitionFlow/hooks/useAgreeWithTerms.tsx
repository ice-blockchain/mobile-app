// SPDX-License-Identifier: ice License 1.0

import {UsersActions} from '@store/modules/Users/actions';
import {migrationUserIdSelector} from '@store/modules/Validation/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useAgreeWithTerms = () => {
  const dispatch = useDispatch();
  const migrationUserId = useSelector(migrationUserIdSelector);

  const agreeWithTerms = useCallback(() => {
    if (migrationUserId) {
      dispatch(
        UsersActions.UPDATE_VIEWED_MIGRATION_AGREEMENT.STATE.create(
          migrationUserId,
        ),
      );
      //TODO: start emotions flow
    }
  }, [dispatch, migrationUserId]);

  return {
    agreeWithTerms,
  };
};
