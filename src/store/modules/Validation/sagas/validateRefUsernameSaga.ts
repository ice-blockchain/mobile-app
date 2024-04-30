// SPDX-License-Identifier: ice License 1.0

import {USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH} from '@constants/validations';
import {userSelector} from '@store/modules/Account/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {t} from '@translations/i18n';
import {validateUsername} from '@utils/username';
import {put, select} from 'redux-saga/effects';

const actionCreator = ValidationActions.REF_USERNAME_VALIDATION.START.create;

export function* validateRefUsernameSaga(
  action: ReturnType<typeof actionCreator>,
) {
  let user: ReturnType<typeof userSelector> = yield select(userSelector);
  const {refUsername} = action.payload;

  if (refUsername.length < USERNAME_MIN_LENGTH) {
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
        t('errors.min_username'),
      ),
    );
  } else if (refUsername.length > USERNAME_MAX_LENGTH) {
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
        t('errors.max_username'),
      ),
    );
  } else if (!validateUsername(refUsername)) {
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
        t('errors.invalid_username'),
      ),
    );
  } else if (
    user &&
    user.username?.toLowerCase() === refUsername.toLowerCase()
  ) {
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.FAILED.create(
        t('username.error.refer_yourself'),
      ),
    );
  } else {
    yield put(
      ValidationActions.REF_USERNAME_VALIDATION.SUCCESS.create(refUsername),
    );
  }
}
