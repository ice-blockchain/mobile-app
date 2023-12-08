// SPDX-License-Identifier: ice License 1.0

import {isApiError} from '@api/client';
import {Api} from '@api/index';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {socialKycMethodToApiSocialMethod} from '@store/modules/SocialKyc/utils';
import {t} from '@translations/i18n';
import {showError} from '@utils/errors';
import {isValidURI} from '@utils/uri';
import {call, put, SagaReturnType, select, spawn} from 'redux-saga/effects';
import {wait} from 'rn-units';

type Actions = ReturnType<
  typeof SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create
>;

export function* initSocialKyc(action: Actions) {
  try {
    const {postUrl, accessToken, socialKycMethod, kycStep} = action.payload;
    const isValidPostUrl: SagaReturnType<typeof isValidURI> = yield call(
      isValidURI,
      postUrl,
    );
    if (!isValidPostUrl) {
      // wait here for LOADING status to be reflected in UI.
      // Because if it was ERROR before SocialKycActions.SOCIAL_KYC_VERIFICATION.START call and gets failed here again on UI the status is not reset
      yield call(wait, 100);
      yield put(
        SocialKycActions.SOCIAL_KYC_VERIFICATION.ERROR.create({
          message: t('invalid_link.title'),
        }),
      );
      return;
    }
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
    const skippable =
      isApiError(
        error,
        409,
        'SOCIAL_KYC_STEP_ALREADY_COMPLETED_SUCCESSFULLY',
      ) || isApiError(error, 403, 'SOCIAL_KYC_STEP_NOT_AVAILABLE');
    yield put(
      SocialKycActions.SOCIAL_KYC_VERIFICATION.ERROR.create({skippable}),
    );
    if (!skippable) {
      yield spawn(showError, error);
    }
  }
}
