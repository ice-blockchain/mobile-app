// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {showError} from '@utils/errors';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

const actionCreator = AccountActions.UPDATE_ACCOUNT.START.create;

export function* updateAccountSaga(action: ReturnType<typeof actionCreator>) {
  const user: ReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );
  try {
    const userInfo = {
      checksum: user.checksum,
      ...action.payload.userInfo,
    };

    if (userInfo.phoneNumber) {
      const normalizedNumber = e164PhoneNumber(userInfo.phoneNumber);

      if (!normalizedNumber) {
        throw new Error(t('errors.general_error_message'));
      }

      userInfo.phoneNumber = normalizedNumber;
      userInfo.phoneNumberHash = yield call(hashPhoneNumber, normalizedNumber);
    }

    const languageToUpdate = user.language;

    const modifiedUser: SagaReturnType<typeof Api.user.updateAccount> =
      yield Api.user.updateAccount(user.id, userInfo);
    yield put(
      AccountActions.UPDATE_ACCOUNT.SUCCESS.create(
        modifiedUser,
        action.payload.userInfo,
      ),
    );

    if (languageToUpdate && modifiedUser.language) {
      yield put(
        AccountActions.SYNC_LANGUAGES.SUCCESS.create(
          languageToUpdate,
          modifiedUser.language,
        ),
      );
    }
  } catch (error) {
    let localizedError = null;
    if (isApiError(error, 400, 'RACE_CONDITION') && user) {
      const freshUser: SagaReturnType<typeof Api.user.getUserById> = yield call(
        Api.user.getUserById,
        user.id,
      );
      yield put(AccountActions.GET_ACCOUNT.SUCCESS.create(freshUser));
      const {retry} = yield action.payload.raceConditionStrategy(freshUser);
      if (retry) {
        yield put(
          AccountActions.UPDATE_ACCOUNT.START.create(
            action.payload.userInfo,
            action.payload.raceConditionStrategy,
          ),
        );
      }
    } else if (
      isApiError(error, 400, 'INVALID_PHONE_NUMBER') ||
      isApiError(error, 400, 'INVALID_PHONE_NUMBER_FORMAT')
    ) {
      localizedError = t('errors.wrong_phone_number');
    } else if (isApiError(error, 400, 'INVALID_USERNAME')) {
      localizedError = t('errors.invalid_username');
    } else if (isApiError(error, 404, 'USER_NOT_FOUND')) {
      localizedError = t('errors.user_not_found');
    } else if (isApiError(error, 404, 'REFERRAL_NOT_FOUND')) {
      localizedError = t('username.error.not_found');
    } else if (isApiError(error, 409, 'CONFLICT_WITH_ANOTHER_USER')) {
      const field = error?.response?.data?.data?.field;
      switch (field) {
        case 'username':
          localizedError = t('username.error.already_taken');
          break;
        case 'email':
          localizedError = t('errors.email_already_taken');
          break;
        case 'phoneNumberHash':
        case 'phoneNumber':
          localizedError = t('errors.phone_number_already_taken');
          break;
      }
    }

    if (localizedError) {
      yield put(AccountActions.UPDATE_ACCOUNT.FAILED.create(localizedError));
    } else {
      yield put(AccountActions.UPDATE_ACCOUNT.RESET.create());
      showError(error);
    }
    throw error;
  }
}
