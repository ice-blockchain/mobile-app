// SPDX-License-Identifier: ice License 1.0

import {SOCIALS_POPUP_INTERVAL_SEC} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialTypesOrder} from '@store/modules/Socials/data';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {SocialsShare} from '@store/modules/Socials/types';
import {shallowCompareUnsorted} from '@utils/array';
import {put, SagaReturnType, select} from 'redux-saga/effects';

export function* scheduleSocialsSaga() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const scheduledSocials: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(userId));

  if (
    !shallowCompareUnsorted(
      socialTypesOrder,
      scheduledSocials.map(social => social.type),
    )
  ) {
    const socialsToSchedule = socialTypesOrder.reduce<SocialsShare[]>(
      (schedule, socialType) => {
        const scheduledSocial = scheduledSocials.find(
          socialInQueue => socialInQueue.type === socialType,
        );
        if (scheduledSocial?.shared) {
          return [...schedule, scheduledSocial];
        } else {
          return [
            ...schedule,
            {
              type: socialType,
              shared: false,
              dateToShow: dayjs()
                .add(SOCIALS_POPUP_INTERVAL_SEC, 'seconds')
                .toISOString(),
            },
          ];
        }
      },
      [],
    );

    yield put(
      SocialsActions.SET_SOCIALS.STATE.create({
        userId,
        socials: socialsToSchedule,
      }),
    );
  }
}
