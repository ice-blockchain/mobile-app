// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {openSocialSaga} from '@store/modules/Socials/sagas/openSocial';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {
  socialsOrder,
  SocialsShare,
  SocialType,
} from '@store/modules/Socials/types';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* shareSocialsSaga() {
  const authenticatedUsedId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const socialsState: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(authenticatedUsedId));

  let socials = [...socialsState];
  let typeToShow: SocialType | null = null;

  /*
   * if user has socials, we show first not shared social
   */
  if (socials && socials.length > 0) {
    const socialsToShow: SocialsShare[] = socials.filter(
      social => !social.shared,
    );

    if (socialsToShow.length > 0) {
      const firstSocialToShow = socialsToShow.reduce((a, b) =>
        a.dateToShow < b.dateToShow ? a : b,
      );

      if (dayjs().isAfter(firstSocialToShow.dateToShow)) {
        /**
         * if first not shared social is ready to show, we open it
         * and update dateToShow for other not shared socials
         */
        socials = socials.map((social, index: number) => {
          if (!social.shared && social.type !== firstSocialToShow.type) {
            return {
              ...social,
              dateToShow: dayjs().add(index, 'day').toISOString(),
            };
          }
          return social;
        });
        /**
         * show first not shared social sorted by closed date to show
         */
        typeToShow = firstSocialToShow.type;
      }
    }
  } else {
    /**
     * if user has no socials, we create default socials for him
     * and schedule them to show starting from next day
     */
    socials = socialsOrder.map((type, index) => {
      return {
        type,
        shared: false,
        dateToShow: dayjs()
          .add(index + 1, 'day')
          .toISOString(),
      };
    });
  }

  yield put(
    SocialsActions.SET_SOCIALS.STATE.create({
      userId: authenticatedUsedId,
      socials,
    }),
  );

  if (typeToShow) {
    const result: ReturnType<typeof openSocialSaga> = yield call(
      openSocialSaga,
      typeToShow,
    );

    return result;
  } else {
    return {status: 'skipped'};
  }
}
