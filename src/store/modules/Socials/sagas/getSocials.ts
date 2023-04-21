// SPDX-License-Identifier: ice License 1.0

import {openSocial} from '@store/modules/Socials/utils/openSocial';
import {call, SagaReturnType} from 'redux-saga/effects';

export function* getSocialsSaga() {
  try {
    const result: SagaReturnType<typeof openSocial> = yield call(
      openSocial,
      'instagram',
    );

    if (result === 'no') {
      return;
    }
  } catch (error) {
    throw error;
  }
}
