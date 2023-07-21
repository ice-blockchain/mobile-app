// SPDX-License-Identifier: ice License 1.0

import {Attributes} from '@services/analytics';
import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {call, put} from 'redux-saga/effects';

type Actions = ReturnType<
  typeof AccountActions.UPDATE_REF_BY_USERNAME.SUCCESS.create
>;

export function* updateReferredBySaga(action: Actions) {
  const {user} = action.payload;
  const referredBy = user?.username ?? user?.id ?? '';
  const referredById = user?.id ?? '';
  yield call(Attributes.trackUserAttribute, 'Referred By', referredBy);
  yield put(
    AnalyticsActions.UPDATE_REFERRED_BY.SUCCESS.create({
      referredBy,
      referredById,
    }),
  );
}
