// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {socialKycMethodToApiSocialMethod} from '@store/modules/SocialKyc/utils';
import {showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.START.create
>;

export function* getSocialKycRepostText(action: Actions) {
  try {
    const {socialKycMethod, kycStep} = action.payload;
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    const result: SagaReturnType<typeof Api.kyc.verifySocialKYCStep> =
      yield call(Api.kyc.verifySocialKYCStep, {
        userId: user.id,
        language: user.language,
        kycStep,
        social: socialKycMethodToApiSocialMethod(socialKycMethod),
      });
    if (result.expectedPostText) {
      yield put(
        SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.SUCCESS.create({
          repostText: result.expectedPostText,
        }),
      );
    } else {
      yield put(
        SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.create({
          skippable: true,
        }),
      );
    }
  } catch (error: unknown) {
    const skippable =
      isApiError(
        error,
        409,
        'SOCIAL_KYC_STEP_ALREADY_COMPLETED_SUCCESSFULLY',
      ) || isApiError(error, 403, 'SOCIAL_KYC_STEP_NOT_AVAILABLE');
    yield put(
      SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.create({skippable}),
    );
    if (!skippable) {
      yield spawn(showError, error);
    }
  }
}
