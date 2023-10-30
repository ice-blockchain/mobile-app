// SPDX-License-Identifier: ice License 1.0

import {is5xxApiError} from '@api/client';
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
      yield put(SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.create());
    }
  } catch (error: unknown) {
    yield put(SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.ERROR.create());
    if (is5xxApiError(error)) {
      yield spawn(showError, error);
    }
  }
}
