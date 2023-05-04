// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {AccountActions} from '@store/modules/Account/actions';
import {ValidationActions} from '@store/modules/Validation/actions';
import produce from 'immer';

export type TemporaryPhoneVerificationStepType = 'phone' | 'code';

export interface State {
  temporaryPhoneNumber: string | null;
  temporaryPhoneIsoCode: string | null;
  temporaryVerificationId: string | null;
  temporaryEmail: string | null;
  temporaryPhoneVerificationStep: TemporaryPhoneVerificationStepType;
  smsSentTimestamp: number | null;
  emailSentTimestamp: number | null;
}

type Actions = ReturnType<
  | typeof AccountActions.SIGN_OUT.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.SET_TEMP_PHONE_AND_ISO.create
  | typeof AccountActions.SIGN_IN_PHONE.SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.create
  | typeof AccountActions.SIGN_IN_PHONE.RESET.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.SET_TEMP_EMAIL.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.SUCCESS.create
  | typeof AccountActions.SIGN_IN_EMAIL_LINK.RESET.create
  | typeof ValidationActions.PHONE_VALIDATION.SUCCESS.create
  | typeof ValidationActions.PHONE_VALIDATION.FAILED.create
  | typeof ValidationActions.PHONE_VALIDATION.RESET.create
  | typeof ValidationActions.EMAIL_VALIDATION.SUCCESS.create
  | typeof ValidationActions.EMAIL_VALIDATION.FAILED.create
  | typeof ValidationActions.EMAIL_VALIDATION.RESET.create
  | typeof ValidationActions.SET_TEMPORARY_PHONE_VERIFICATION_STEP.STATE.create
  | typeof AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SET_TEMP_EMAIL.create
  | typeof AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.RESET.create
  | typeof AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SUCCESS.create
  | typeof AccountActions.VERIFY_PHONE_NUMBER.SUCCESS.create
  | typeof AccountActions.VERIFY_PHONE_NUMBER.RESET.create
>;

const INITIAL_STATE: State = {
  temporaryPhoneNumber: null,
  temporaryPhoneIsoCode: null,
  temporaryVerificationId: null,
  temporaryEmail: null,
  smsSentTimestamp: null,
  emailSentTimestamp: null,
  temporaryPhoneVerificationStep: 'phone',
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
        draft.temporaryPhoneIsoCode = action.payload.isoCode;
        draft.temporaryPhoneVerificationStep = 'code';
        draft.smsSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_PHONE.RESEND_SUCCESS.type:
        draft.smsSentTimestamp = dayjs().valueOf();
        break;
      case AccountActions.SIGN_IN_EMAIL_LINK.SET_TEMP_EMAIL.type:
      case AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SET_TEMP_EMAIL.type:
        draft.temporaryEmail = action.payload.email;
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
        draft.temporaryVerificationId = null;
        draft.temporaryPhoneNumber = null;
        draft.temporaryPhoneVerificationStep = 'phone';
        break;
      case ValidationActions.EMAIL_VALIDATION.SUCCESS.type:
      case ValidationActions.EMAIL_VALIDATION.RESET.type:
      case AccountActions.SIGN_IN_EMAIL_LINK.SUCCESS.type:
      case AccountActions.SIGN_IN_EMAIL_LINK.RESET.type:
      case AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.RESET.type:
      case AccountActions.VERIFY_BEFORE_UPDATE_EMAIL.SUCCESS.type:
        draft.temporaryEmail = null;
        break;
      case ValidationActions.EMAIL_VALIDATION.FAILED.type:
        if (
          ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
            action.payload.errorCode,
          )
        ) {
          draft.temporaryEmail = null;
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
