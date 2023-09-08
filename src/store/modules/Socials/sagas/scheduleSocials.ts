// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {socialsOrder} from '@store/modules/Socials/types';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* scheduleSocialsSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const socialsQueue: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(userId));

  if (socialsQueue.length === 0) {
    const socials = socialsOrder.map((type, index) => ({
      type,
      shared: false,
      dateToShow: dayjs()
        .add(index + 1, 'day')
        .toISOString(),
    }));
    yield put(SocialsActions.SET_SOCIALS.STATE.create({userId, socials}));
  }
}
