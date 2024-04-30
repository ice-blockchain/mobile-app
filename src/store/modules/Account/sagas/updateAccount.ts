// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {
  EoaBscAddressError,
  isEoaBscAddress,
  isValidBscAddress,
  unchecksummAddress,
} from '@services/bsc';
import {logError} from '@services/logging';
import {
  isValidationError,
  ValidationError,
  ValidationErrorCode,
} from '@store/errors/validation';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {showError} from '@utils/errors';
import {checkProp} from '@utils/guards';
import {e164PhoneNumber, hashPhoneNumber} from '@utils/phoneNumber';
import RNRestart from 'react-native-restart';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

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

    if (checkProp(userInfo, 'miningBlockchainAccountAddress')) {
      yield call(
        validateMiningBlockchainAccountAddress,
        userInfo.miningBlockchainAccountAddress,
      );

      if (userInfo.miningBlockchainAccountAddress) {
        userInfo.miningBlockchainAccountAddress = unchecksummAddress(
          userInfo.miningBlockchainAccountAddress,
        );
      }
    }

    const modifiedUser: SagaReturnType<typeof Api.user.updateAccount> =
      yield Api.user.updateAccount(user.id, userInfo);
    yield put(
      AccountActions.UPDATE_ACCOUNT.SUCCESS.create(
        modifiedUser,
        action.payload.userInfo,
      ),
    );

    if (action.payload.userInfo.language) {
      RNRestart.restart();
    }
  } catch (error) {
    let localizedError = null;
    if (isApiError(error, 400, 'RACE_CONDITION') && user) {
      const {data: freshUser}: SagaReturnType<typeof Api.user.getUserById> =
        yield call(Api.user.getUserById, user.id);
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
        case 'mining_blockchain_account_address':
          localizedError = t('errors.blockchain_address_already_taken');
          break;
      }
    } else if (isValidationError(error)) {
      localizedError = error.message;
    }

    if (localizedError) {
      yield put(AccountActions.UPDATE_ACCOUNT.FAILED.create(localizedError));
    } else {
      yield put(AccountActions.UPDATE_ACCOUNT.RESET.create());
      yield spawn(showError, error);
    }
    throw error;
  }
}

function* validateMiningBlockchainAccountAddress(
  miningBlockchainAccountAddress?: string,
) {
  const user: ReturnType<typeof unsafeUserSelector> = yield select(
    unsafeUserSelector,
  );
  const isAddrRemoveAction =
    !miningBlockchainAccountAddress && !!user.miningBlockchainAccountAddress;
  if (!isAddrRemoveAction) {
    if (
      !miningBlockchainAccountAddress ||
      !isValidBscAddress(miningBlockchainAccountAddress)
    ) {
      throw new ValidationError(ValidationErrorCode.InvalidBscAddress);
    }

    try {
      const isEoa: SagaReturnType<typeof isEoaBscAddress> = yield call(
        isEoaBscAddress,
        miningBlockchainAccountAddress,
      );
      if (!isEoa) {
        throw new ValidationError(ValidationErrorCode.BscAddressIsNotEoa);
      }
    } catch (error) {
      if (isValidationError(error)) {
        throw error;
      }

      const typedError = error as EoaBscAddressError;
      const networkErrorTypes: typeof typedError['name'][] = [
        'HttpRequestError',
        'TimeoutError',
      ];
      if (!networkErrorTypes.includes(typedError.name)) {
        logError(error);
      }
      throw new ValidationError(
        ValidationErrorCode.UnableToValidateBscAddressEoa,
      );
    }
  }
}
