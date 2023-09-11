// SPDX-License-Identifier: ice License 1.0

import {SOCIALS_POPUP_INTERVAL_SEC} from '@constants/timeouts';
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
    const socials = socialsOrder.map(type => ({
      type,
      shared: false,
      dateToShow: dayjs()
        .add(SOCIALS_POPUP_INTERVAL_SEC, 'seconds')
        .toISOString(),
    }));
    yield put(SocialsActions.SET_SOCIALS.STATE.create({userId, socials}));
  }
}
