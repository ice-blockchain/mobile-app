// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
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
    const {postUrl, accessToken, socialKycMethod, kycStep} = action.payload;
    const user: SagaReturnType<typeof unsafeUserSelector> = yield select(
      unsafeUserSelector,
    );
    const result: SagaReturnType<typeof Api.kyc.verifySocialKYCStep> =
      yield call(Api.kyc.verifySocialKYCStep, {
        userId: user.id,
        language: user.language,
        kycStep,
        social: socialKycMethodToApiSocialMethod(socialKycMethod),
        link: postUrl,
        accessToken,
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
    if (
      !(
        // for those 2 specific errors just silently start the mining. for all others also show the monkey
        (
          isApiError(
            error,
            409,
            'SOCIAL_KYC_STEP_ALREADY_COMPLETED_SUCCESSFULLY',
          ) || isApiError(error, 403, 'SOCIAL_KYC_STEP_NOT_AVAILABLE')
        )
      )
    ) {
      yield spawn(showError, error);
    }
  }
}
