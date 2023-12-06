// SPDX-License-Identifier: ice License 1.0

import {takeLeading} from '@redux-saga/core/effects';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {getSocialKycRepostText} from '@store/modules/SocialKyc/sagas/getSocialKycRepostText';
import {initSocialKyc} from '@store/modules/SocialKyc/sagas/initSocialKyc';

export const socialKycWatchers = [
  takeLeading(
    SocialKycActions.SOCIAL_KYC_VERIFICATION.START.type,
    initSocialKyc,
  ),
  takeLeading(
    SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.START.type,
    getSocialKycRepostText,
  ),
];
