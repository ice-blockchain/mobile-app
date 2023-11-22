// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {signInWithPhoneNumber} from '@services/auth';
import {AccountActions} from '@store/modules/Account/actions';
import {
  authConfigSelector,
  isEmailCodeFlowSelector,
} from '@store/modules/Account/selectors';
import {openPhoneAuthBlocked} from '@store/modules/Account/utils/openPhoneAuthBlocked';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {deviceLocaleCountry, t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {call, put, SagaReturnType, select, take} from 'redux-saga/effects';

enum ValidateError {
  InvalidPhone,
}

export function* signInPhoneSaga(
  startAction: ReturnType<typeof AccountActions.SIGN_IN_PHONE.START.create>,
) {
  try {
    const {phoneNumber, isoCode} = startAction.payload;

    if (phoneNumber.trim() === '') {
      throw {code: ValidateError.InvalidPhone};
    }

    const authPhoneEnabledForCountry: SagaReturnType<
      typeof checkAuthPhoneEnabledForCountry
    > = yield call(checkAuthPhoneEnabledForCountry);

    if (!authPhoneEnabledForCountry) {
      const user: SagaReturnType<typeof getUserByPhoneNumber> = yield call(
        getUserByPhoneNumber,
        phoneNumber,
      );
      if (!user) {
        yield call(openPhoneAuthBlocked);
        yield put(AccountActions.SIGN_IN_PHONE.RESET.create());
        return;
      } else if (user.email) {
        const isEmailCodeFlow: ReturnType<typeof isEmailCodeFlowSelector> =
          yield select(isEmailCodeFlowSelector);
        yield put(
          AccountActions[
            isEmailCodeFlow ? 'SIGN_IN_EMAIL_CODE' : 'SIGN_IN_EMAIL_LINK'
          ].START.create(user.email, t('confirm_email.migration_note')),
        );
        yield put(AccountActions.SIGN_IN_PHONE.RESET.create());
        return;
      }
    }

    let confirmation: SagaReturnType<typeof signInWithPhoneNumber> = yield call(
      signInWithPhoneNumber,
      phoneNumber,
    );

    yield put(
      AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create(
        phoneNumber,
        isoCode,
      ),
    );

    let finished = false;
    while (!finished) {
      const action: ReturnType<
        | typeof AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create
        | typeof AccountActions.SIGN_IN_PHONE.RESEND.create
        | typeof AccountActions.SIGN_IN_PHONE.RESET.create
      > = yield take([
        AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type,
        AccountActions.SIGN_IN_PHONE.RESEND.type,
        AccountActions.SIGN_IN_PHONE.RESET.type,
      ]);

      switch (action.type) {
        case AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.type: {
          try {
            yield call(
              [confirmation, confirmation.confirm],
              action.payload.code,
            );
            yield put(AccountActions.SIGN_IN_PHONE.SUCCESS.create());
            finished = true;
          } catch (error) {
            yield put(
              AccountActions.SIGN_IN_PHONE.FAILED.create(
                getErrorMessage(error),
              ),
            );
          }
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESEND.type: {
          confirmation = yield call(signInWithPhoneNumber, phoneNumber);
          yield put(AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create());
          break;
        }
        case AccountActions.SIGN_IN_PHONE.RESET.type:
          finished = true;
          break;
      }
    }
  } catch (error) {
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidPhone) {
      yield put(
        AccountActions.SIGN_IN_PHONE.FAILED.create(t('errors.invalid_phone')),
      );
    } else {
      yield put(
        AccountActions.SIGN_IN_PHONE.FAILED.create(getErrorMessage(error)),
      );
      throw error;
    }
  }
}

function* getUserByPhoneNumber(phoneNumber: string) {
  const user: SagaReturnType<typeof Api.user.getUserByPhoneNumber> = yield call(
    Api.user.getUserByPhoneNumber,
    {phoneNumber},
  );
  // TODO::check 404?
  if (!user) {
    return {email: 'foo@bar.baz'};
  }
  return user;
}

//TODO:: to selector
function* checkAuthPhoneEnabledForCountry() {
  const authConfig: ReturnType<typeof authConfigSelector> = yield select(
    authConfigSelector,
  );
  const deviceLocation: ReturnType<typeof deviceLocationSelector> =
    yield select(deviceLocationSelector);

  const isEqualsToDeviceCountry = (country: string) => {
    return [
      deviceLocaleCountry.toLowerCase(),
      deviceLocation?.country?.toLowerCase(),
    ].includes(country.toLowerCase());
  };
  if (authConfig) {
    if (checkProp(authConfig, 'phoneAuthWhiteList')) {
      return authConfig.phoneAuthWhiteList.some(isEqualsToDeviceCountry);
    }

    if (checkProp(authConfig, 'phoneAuthBlackList')) {
      return !authConfig.phoneAuthBlackList.some(isEqualsToDeviceCountry);
    }
  }

  //TODO::by default true?
  return false;
}
