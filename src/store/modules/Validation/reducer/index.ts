// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export type TemporaryPhoneVerificationStepType = 'phone' | 'code';

export interface State {
  temporaryPhoneNumber: string | null;
  temporaryPhoneNumberIso: string | null;
  temporaryPhoneVerificationStep: TemporaryPhoneVerificationStepType;
  smsSentTimestamp: number | null;
  temporaryVerificationId: string | null;

  temporaryEmail: string | null;
  temporaryEmailCode: string | null;
  temporaryEmailVerificationStep: 'email' | 'link' | 'code';
  emailSentTimestamp: number | null;
  temporaryMigrationUserId: string | null;
  temporaryMigrationPhoneNumber: string | null;
  temporaryMigrationEmail: string | null;
  temporaryMigrationEmailCode: string | null;
  temporaryMigrationLoginSession: string | null;
}

type Actions = ReturnType<
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create
  | typeof AccountActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESET.create
  | typeof AccountActions.SIGN_IN_PHONE.SET_MIGRATION_DATA.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.SET_TEMP_EMAIL.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.SUCCESS.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.RESET.create
  | typeof AccountActions.SIGN_IN_EMAIL_CODE.SET_TEMP_EMAIL.create
  | typeof AccountActions.SIGN_IN_EMAIL_CODE.SUCCESS.create
  | typeof AccountActions.SIGN_IN_EMAIL_CODE.RESET.create
  | typeof AccountActions.SIGN_IN_EMAIL_CODE.FAILED.create
  | typeof ValidationActions.PHONE_VALIDATION.SUCCESS.create
  | typeof ValidationActions.PHONE_VALIDATION.FAILED.create
  | typeof ValidationActions.PHONE_VALIDATION.RESET.create
  | typeof ValidationActions.EMAIL_VALIDATION.SUCCESS.create
  | typeof ValidationActions.EMAIL_VALIDATION.FAILED.create
  | typeof ValidationActions.EMAIL_VALIDATION.RESET.create
  | typeof ValidationActions.SET_TEMPORARY_PHONE_VERIFICATION_STEP.STATE.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_LINK.SET_TEMP_EMAIL.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_LINK.SUCCESS.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_CODE.SET_TEMP_EMAIL.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_CODE.RESET.create
  | typeof AccountActions.MODIFY_EMAIL_WITH_CODE.SUCCESS.create
  | typeof AccountActions.VERIFY_PHONE_NUMBER.SUCCESS.create
  | typeof AccountActions.VERIFY_PHONE_NUMBER.RESET.create
  | typeof AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.RESET.create
  | typeof AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.START.create
  | typeof AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.SET_SESSION.create
  | typeof AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.EDIT_EMAIL.create
  | typeof AccountActions.MIGRATE_EMAIL_WITH_CODE.SET_CODE.create
>;

const INITIAL_STATE: State = {
  temporaryPhoneNumber: null,
  temporaryPhoneNumberIso: null,
  temporaryPhoneVerificationStep: 'phone',
  temporaryVerificationId: null,
  smsSentTimestamp: null,

  temporaryEmail: null,
  temporaryEmailCode: null,
  emailSentTimestamp: null,
  temporaryEmailVerificationStep: 'email',
  temporaryMigrationUserId: null,
  temporaryMigrationPhoneNumber: null,
  temporaryMigrationEmail: null,
  temporaryMigrationEmailCode: null,
  temporaryMigrationLoginSession: null,
};

function reducer(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case ValidationActions.SET_TEMPORARY_PHONE_VERIFICATION_STEP.STATE.type:
        draft.temporaryPhoneVerificationStep =
          action.payload.temporaryPhoneVerificationStep;
        break;
      case AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.type:
        draft.temporaryPhoneNumber = action.payload.phoneNumber;
        draft.temporaryPhoneNumberIso = action.payload.isoCode;
        draft.temporaryPhoneVerificationStep = 'code';
        draft.smsSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.type:
        draft.smsSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_PHONE.SET_MIGRATION_DATA.type:
        draft.temporaryMigrationUserId = action.payload.userId;
        draft.temporaryMigrationPhoneNumber = action.payload.phoneNumber;
        break;
      case AccountActions.SIGN_IN_EMAIL_LINK.SET_TEMP_EMAIL.type:
      case AccountActions.MODIFY_EMAIL_WITH_LINK.SET_TEMP_EMAIL.type:
        draft.temporaryEmail = action.payload.email;
        draft.temporaryEmailVerificationStep = 'link';
        draft.emailSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_EMAIL_CODE.SET_TEMP_EMAIL.type:
      case AccountActions.MODIFY_EMAIL_WITH_CODE.SET_TEMP_EMAIL.type:
        draft.temporaryEmail = action.payload.email;
        draft.temporaryEmailCode = action.payload.code;
        draft.temporaryEmailVerificationStep = 'code';
        draft.emailSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.VERIFY_PHONE_NUMBER.SUCCESS.type:
        const {phoneNumber, verificationId} = action.payload;
        draft.temporaryPhoneNumber = phoneNumber;
        draft.temporaryVerificationId = verificationId;
        draft.temporaryPhoneVerificationStep = 'code';
        draft.smsSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_PHONE.SUCCESS.type:
      case AccountActions.SIGN_IN_PHONE.RESET.type:
      case AccountActions.VERIFY_PHONE_NUMBER.RESET.type:
      case ValidationActions.PHONE_VALIDATION.SUCCESS.type:
      case ValidationActions.PHONE_VALIDATION.RESET.type:
      case AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.RESET.type:
        draft.temporaryVerificationId = null;
        draft.temporaryPhoneNumber = null;
        draft.temporaryPhoneVerificationStep = 'phone';
        draft.temporaryMigrationUserId = null;
        draft.temporaryMigrationPhoneNumber = null;
        draft.temporaryMigrationEmail = null;
        draft.temporaryMigrationEmailCode = null;
        draft.temporaryMigrationLoginSession = null;
        break;
      case AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.EDIT_EMAIL.type:
        draft.temporaryMigrationEmail = null;
        draft.temporaryMigrationEmailCode = null;
        draft.temporaryMigrationLoginSession = null;
        break;
      case AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.START.type:
        draft.temporaryMigrationEmail = action.payload.email;
        break;
      case AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.SET_SESSION.type:
        draft.temporaryMigrationLoginSession = action.payload.loginSession;
        break;
      case AccountActions.MIGRATE_EMAIL_WITH_CODE.SET_CODE.type:
        draft.temporaryMigrationEmailCode = action.payload.code;
        break;
      case ValidationActions.EMAIL_VALIDATION.SUCCESS.type:
      case ValidationActions.EMAIL_VALIDATION.RESET.type:
      case AccountActions.SIGN_IN_EMAIL_LINK.SUCCESS.type:
      case AccountActions.SIGN_IN_EMAIL_LINK.RESET.type:
      case AccountActions.SIGN_IN_EMAIL_CODE.SUCCESS.type:
      case AccountActions.SIGN_IN_EMAIL_CODE.RESET.type:
      case AccountActions.SIGN_IN_EMAIL_CODE.FAILED.type:
      case AccountActions.MODIFY_EMAIL_WITH_LINK.RESET.type:
      case AccountActions.MODIFY_EMAIL_WITH_LINK.SUCCESS.type:
      case AccountActions.MODIFY_EMAIL_WITH_CODE.RESET.type:
      case AccountActions.MODIFY_EMAIL_WITH_CODE.SUCCESS.type:
        draft.temporaryEmail = null;
        draft.temporaryEmailCode = null;
        draft.temporaryEmailVerificationStep = 'email';
        break;
      case ValidationActions.EMAIL_VALIDATION.FAILED.type:
        if (
          ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
            action.payload.errorCode,
          )
        ) {
          draft.temporaryEmail = null;
          draft.temporaryEmailVerificationStep = 'email';
        }
        break;
      case AccountActions.SIGN_OUT.SUCCESS.type: {
        return {
          ...INITIAL_STATE,
        };
      }
    }
  });
}

export const validationReducer = reducer;
