// SPDX-License-Identifier: ice License 1.0

import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {
  socialsOrder,
  SocialsShare,
  SocialType,
} from '@store/modules/Socials/types';
import {openSocial} from '@store/modules/Socials/utils/openSocial';
import {getNextDate} from '@utils/date';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getSocialsSaga() {
  const authenticatedUsedId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const socials: SocialsShare[] | null = yield select(
    socialsByUserIdSelector(authenticatedUsedId),
  );

  try {
    let typeToShow: SocialType | null = null;

    if (socials && socials.length > 0) {
      const socialsToShow: SocialsShare[] = socials.filter(
        social => !social.shared,
      );

      if (socialsToShow.length > 0) {
        typeToShow = socialsToShow[0].type;
      }
    } else {
      const defaultSocials: SocialsShare[] = socialsOrder.map((type, index) => {
        return {type, shared: false, dateToShow: getNextDate(index)};
      });

      yield put(
        SocialsActions.SOCIALS_SET_DEFAULT.STATE.create({
          socials: defaultSocials,
        }),
      );

      typeToShow = socialsOrder[0]; // show first social
    }

    if (typeToShow) {
      const result: SagaReturnType<typeof openSocial> = yield call(
        openSocial,
        typeToShow,
      );

      if (result === 'yes') {
        const userSocials: SocialsShare[] = yield select(
          socialsByUserIdSelector(authenticatedUsedId),
        );

        const updatedSocials: SocialsShare[] = userSocials.map(social => {
          if (social.type === typeToShow) {
            return {...social, shared: true};
          }

          return social;
        });

        yield put(
          SocialsActions.SOCIALS_MARK_SHARED.SUCCESS.create({
            userId: authenticatedUsedId,
            socials: updatedSocials,
          }),
        );
      } else {
        /*
         * user clicked on "close", we reschedule current social to be shown
         * last in order
         */
      }
    }
  } catch (error) {
    throw error;
  }
}
