// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const temporaryPhoneNumberSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumber;

export const temporaryPhoneNumberIsoSelector = (state: RootState) =>
  state.validation.temporaryPhoneNumberIso;

export const temporaryVerificationIdSelector = (state: RootState) =>
  state.validation.temporaryVerificationId;

export const temporaryEmailSelector = (state: RootState) =>
  state.validation.temporaryEmail;

export const phoneVerificationStepSelector = (state: RootState) =>
  state.validation.temporaryPhoneVerificationStep;

export const emailVerificationStepSelector = (state: RootState) =>
  state.validation.temporaryEmailVerificationStep;

export const emailVerificationCodeSelector = (state: RootState) =>
  state.validation.temporaryEmailCode;

export const smsSentTimestampSelector = (state: RootState) =>
  state.validation.smsSentTimestamp;

export const emailSentTimestampSelector = (state: RootState) =>
  state.validation.emailSentTimestamp;

export const migrationUserIdSelector = (state: RootState) =>
  state.validation.temporaryMigrationUserId;

export const migrationPhoneNumberSelector = (state: RootState) =>
  state.validation.temporaryMigrationPhoneNumber;

export const migrationEmailSelector = (state: RootState) =>
  state.validation.temporaryMigrationEmail;

export const migrationEmailCodeSelector = (state: RootState) =>
  state.validation.temporaryMigrationEmailCode;

export const migrationLoginSessionSelector = (state: RootState) =>
  state.validation.temporaryMigrationLoginSession;
