// SPDX-License-Identifier: ice License 1.0

import {USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH} from '@constants/validations';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {validateUsername} from '@utils/username';
import {put} from 'redux-saga/effects';

const actionCreator = ValidationActions.USERNAME_VALIDATION.START.create;

export function* validateUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  const {username} = action.payload;

  if (username.length < USERNAME_MIN_LENGTH) {
    yield put(
      ValidationActions.USERNAME_VALIDATION.FAILED.create(
        t('errors.min_username'),
      ),
    );
  } else if (username.length > USERNAME_MAX_LENGTH) {
    yield put(
      ValidationActions.USERNAME_VALIDATION.FAILED.create(
        t('errors.max_username'),
      ),
    );
  } else if (!validateUsername(username)) {
    yield put(
      ValidationActions.USERNAME_VALIDATION.FAILED.create(
        t('errors.invalid_username'),
      ),
    );
  } else {
    yield put(ValidationActions.USERNAME_VALIDATION.SUCCESS.create(username));
  }
}
