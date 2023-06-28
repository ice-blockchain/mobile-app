// SPDX-License-Identifier: ice License 1.0

import {sendCustomSignInLinkToEmail, signInWithEmailLink} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import jwt_decode from 'jwt-decode';
import {call, put, SagaReturnType, select, take} from 'redux-saga/effects';

enum ValidateError {
  InvalidEmail,
}

export function* signInEmailCustomSaga(
  startAction: ReturnType<
    typeof AccountActions.SIGN_IN_EMAIL_CUSTOM.START.create
  >,
) {
  try {
    const email = startAction.payload.email;

    if (!email) {
      throw {code: ValidateError.InvalidEmail};
    }

    const deviceUniqueId: SagaReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);

    const language: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    const {loginSession}: SagaReturnType<typeof sendCustomSignInLinkToEmail> =
      yield call(sendCustomSignInLinkToEmail, {
        email,
        deviceUniqueId,
        language,
      });

    const loginSessionPayload = jwt_decode(loginSession);

    if (!checkProp(loginSessionPayload, 'confirmationCode')) {
      throw new Error('confirmationCode is not found in loginSession');
    }

    if (typeof loginSessionPayload.confirmationCode !== 'string') {
      throw new Error('confirmationCode is not a string');
    }

    yield put(
      AccountActions.SIGN_IN_EMAIL_CUSTOM.SET_TEMP_EMAIL.create({
        email,
        code: loginSessionPayload.confirmationCode,
      }),
    );

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.SIGN_IN_EMAIL_CUSTOM.CONFIRM_TEMP_EMAIL.create
        | typeof AccountActions.SIGN_IN_EMAIL_CUSTOM.RESET.create
      > = yield take([
        AccountActions.SIGN_IN_EMAIL_CUSTOM.CONFIRM_TEMP_EMAIL.type,
        AccountActions.SIGN_IN_EMAIL_CUSTOM.RESET.type,
      ]);

      switch (action.type) {
        case AccountActions.SIGN_IN_EMAIL_CUSTOM.CONFIRM_TEMP_EMAIL.type: {
          try {
            yield call(signInWithEmailLink, email, action.payload.link);
            yield put(AccountActions.SIGN_IN_EMAIL_CUSTOM.SUCCESS.create());
            finished = true;
          } catch (error) {
            yield put(
              AccountActions.SIGN_IN_EMAIL_CUSTOM.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.SIGN_IN_EMAIL_CUSTOM.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidEmail) {
      yield put(
        AccountActions.SIGN_IN_EMAIL_CUSTOM.FAILED.create(
          t('errors.invalid_email'),
        ),
      );
    } else {
      yield put(
        AccountActions.SIGN_IN_EMAIL_CUSTOM.FAILED.create(
          getErrorMessage(error),
        ),
      );
      throw error;
    }
  }
}
