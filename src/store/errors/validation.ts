// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';

export enum ValidationErrorCode {
  SamePhoneNumber = 'SamePhoneNumber',
  InvalidEmail = 'InvalidEmail',
  SameEmail = 'SameEmail',
  InvalidPhone = 'InvalidPhone',
  InvalidBscAddress = 'InvalidBscAddress',
  BscAddressIsNotEoa = 'BscAddressIsNotEoa',
  UnableToValidateBscAddressEoa = 'UnableToValidateBscAddressEoa',
}

const validationErrorMessages: {[code in ValidationErrorCode]: string} = {
  InvalidEmail: t('errors.invalid_email'),
  SameEmail: t('errors.same_email'),
  InvalidPhone: t('errors.invalid_phone'),
  SamePhoneNumber: t('errors.same_phone_error'),
  InvalidBscAddress: t('errors.invalid_blockchain_address'),
  BscAddressIsNotEoa: t('errors.address_not_eoa'),
  UnableToValidateBscAddressEoa: t('errors.unable_to_validate_bsc_addr_eoa'),
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
