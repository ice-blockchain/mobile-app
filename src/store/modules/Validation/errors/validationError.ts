// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';

export enum ValidationErrorCode {
  SamePhoneNumber = 'SamePhoneNumber',
  InvalidEmail = 'InvalidEmail',
  SameEmail = 'SameEmail',
  InvalidPhone = 'InvalidPhone',
  InvalidEthereumAddress = 'InvalidEthereumAddress',
  EthereumAddressIsNotEoa = 'EthereumAddressIsNotEoa',
}

const validationErrorMessages: {[code in ValidationErrorCode]: string} = {
  InvalidEmail: t('errors.invalid_email'),
  SameEmail: t('errors.same_email'),
  InvalidPhone: t('errors.invalid_phone'),
  SamePhoneNumber: t('confirm_phone.same_phone_error'),
  InvalidEthereumAddress: t('errors.invalid_blockchain_address'),
  EthereumAddressIsNotEoa: t('errors.ethereum_address_not_eoa'),
};

export class ValidationError extends Error {
  constructor(public code: ValidationErrorCode) {
    super(validationErrorMessages[code]);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};
