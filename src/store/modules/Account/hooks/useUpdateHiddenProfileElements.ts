// SPDX-License-Identifier: ice License 1.0

import {HiddenProfileElement, User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {call} from 'redux-saga/effects';

export const useUpdateHiddenProfileElements = () => {
  const dispatch = useDispatch();
  const user = useSelector(unsafeUserSelector);

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const updateHiddenProfileElement = (
    currentUser: User,
    typeToUpdate: HiddenProfileElement,
  ) => {
    const hiddenElements = currentUser?.hiddenProfileElements ?? [];
    const alreadyHidden = hiddenElements.includes(typeToUpdate);
    let elementsToUpdate: HiddenProfileElement[] = [...hiddenElements];
    if (alreadyHidden) {
      elementsToUpdate = hiddenElements.filter(
        element => element !== typeToUpdate,
      );
    } else {
      elementsToUpdate.push(typeToUpdate);
    }

    dispatch(
      AccountActions.UPDATE_ACCOUNT.START.create(
        {
          hiddenProfileElements: elementsToUpdate,
        },
        function* (freshUser) {
          const freshUserHiddenElements =
            freshUser?.hiddenProfileElements ?? [];

          const alreadyHiddenInFreshUser =
            freshUserHiddenElements.includes(typeToUpdate);

          if (alreadyHidden && !alreadyHiddenInFreshUser) {
            yield call(updateHiddenProfileElement, freshUser, typeToUpdate);
          }

          return {retry: false};
        },
      ),
    );
  };

  const onUpdate = (typeToUpdate: HiddenProfileElement) =>
    updateHiddenProfileElement(user, typeToUpdate);

  return {onUpdate, loading};
};
