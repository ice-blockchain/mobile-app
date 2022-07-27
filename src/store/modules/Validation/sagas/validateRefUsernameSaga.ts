// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {Api} from '@api/index';
import {User} from '@api/user/types';
import {ValidationActions} from '@store/modules/Validation/actions';
import {usernameSelector} from '@store/modules/Validation/selectors';
import {t} from '@translations/i18n';
import {call, put, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.REF_USERNAME_VALIDATION.START.create;

export function* validateRefUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {refUsername, skipValidation} = action.payload;

  const currentUsername: ReturnType<typeof usernameSelector> = yield select(
    usernameSelector,
  );

  try {
    if (skipValidation) {
      yield put(ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(null));
    } else {
      if (currentUsername === refUsername) {
        yield put(
          ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
            t('username.error.refer_yourself'),
          ),
        );
      } else {
        let refUser: User = yield call(Api.user.getUserByUsername, {
          username: refUsername,
        });
        yield put(
          ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUser),
        );
      }
    }
  } catch (error) {
    if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
          t('username.error.not_found'),
        ),
      );
    } else {
      yield put(
        ValidationActions.REF_USERNAME_VALIDATION.FAILED.create('SOME ERROR'),
      );
    }
  }
}
