// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError} from '@api/client';
import {Api} from '@api/index';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {socialKycMethodToApiSocialMethod} from '@store/modules/SocialKyc/utils';
import {showError} from '@utils/errors';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create
>;

export function* initSocialKyc(action: Actions) {
  try {
    const {postUrl, socialKycMethod, kycStep} = action.payload;
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    const result: SagaReturnType<typeof Api.kyc.verifySocialKYCStep> =
      yield call(Api.kyc.verifySocialKYCStep, {
        language: user.language,
        kycStep,
        social: socialKycMethodToApiSocialMethod(socialKycMethod),
        link: postUrl,
      });
    if (result.result === 'SUCCESS') {
      yield put(SocialKycActions.SOCIAL_KYC_VERIFICATION.SUCCESS.create());
    } else {
      yield put(
        SocialKycActions.SOCIAL_KYC_VERIFICATION.FAILURE.create({
          remainingAttempts: result.remainingAttempts ?? 0,
        }),
      );
    }
  } catch (error: unknown) {
    yield put(SocialKycActions.SOCIAL_KYC_VERIFICATION.ERROR.create());
    if (is5xxApiError(error)) {
      yield spawn(showError, error);
    }
  }
}
