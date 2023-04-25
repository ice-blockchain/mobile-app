// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialData} from '@store/modules/Socials/data';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {
  socialsOrder,
  SocialsShare,
  SocialType,
} from '@store/modules/Socials/types';
import {openSocial} from '@store/modules/Socials/utils/openSocial';
import {Linking} from 'react-native';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* shareSocialsSaga() {
  const authenticatedUsedId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const socials: SocialsShare[] = yield select(
    socialsByUserIdSelector(authenticatedUsedId),
  );

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
        const updatedSocials: SocialsShare[] = socials.map(
          (social, index: number) => {
            if (!social.shared && social.type !== firstSocialToShow.type) {
              return {
                ...social,
                dateToShow: dayjs().add(index, 'day').toISOString(),
              };
            }
            return social;
          },
        );

        yield put(
          SocialsActions.SET_SOCIALS.STATE.create({
            userId: authenticatedUsedId,
            socials: updatedSocials,
          }),
        );

        /**
         * show first not shared social sorted by closed date to show
         */
        typeToShow = firstSocialToShow.type;
      }
    }
  } else {
    /**
     * if user has no socials, we create default socials
     */
    const defaultSocials: SocialsShare[] = socialsOrder.map((type, index) => {
      return {
        type,
        shared: false,
        dateToShow: dayjs().add(index, 'day').toISOString(),
      };
    });

    yield put(
      SocialsActions.SET_SOCIALS.STATE.create({
        socials: defaultSocials,
        userId: authenticatedUsedId,
      }),
    );

    /**
     * show first default social
     */
    typeToShow = socialsOrder[0];
  }

  if (typeToShow) {
    const result: SagaReturnType<typeof openSocial> = yield call(
      openSocial,
      typeToShow,
    );

    /*
     * if user clicked on "share", we mark current social as shared
     */

    if (result === 'yes') {
      const updatedSocials: SocialsShare[] = socials.map(social => {
        if (social.type === typeToShow) {
          return {...social, shared: true};
        }

        return social;
      });

      yield put(
        SocialsActions.SET_SOCIALS.STATE.create({
          userId: authenticatedUsedId,
          socials: updatedSocials,
        }),
      );

      let linkApp = socialData[typeToShow].linkApp;

      if (typeToShow === 'tiktok') {
        /*
         * TikTok doesn't support canOpenURL
         */
        return Linking.openURL(linkApp);
      } else {
        const supported: SagaReturnType<typeof Linking.canOpenURL> = yield call(
          Linking.canOpenURL,
          linkApp,
        );

        if (supported) {
          return Linking.openURL(linkApp);
        }
        return Linking.openURL(socialData[typeToShow].linkWeb);
      }
    } else {
      /*
       * user clicked on "close", we reschedule current social to be shown
       * last in order
       */
      const notSharedSocials: SocialsShare[] = socials.filter(
        social => !social.shared,
      );

      const latestShowDateSocial = notSharedSocials.reduce((a, b) =>
        a.dateToShow > b.dateToShow ? a : b,
      );

      if (latestShowDateSocial) {
        /**
         * if user has only one not share social,
         * we schedule it to be shown on next day
         */
        const scheduleDate = dayjs(
          notSharedSocials.length === 1
            ? undefined
            : latestShowDateSocial.dateToShow,
        )
          .add(1, 'day')
          .toISOString();

        const updated: SocialsShare[] = socials.map(social => {
          if (social.type === typeToShow) {
            const modifiedSocial = Object.assign({}, social);
            modifiedSocial.dateToShow = scheduleDate;
            return modifiedSocial;
          }
          return social;
        });
        yield put(
          SocialsActions.SET_SOCIALS.STATE.create({
            userId: authenticatedUsedId,
            socials: updated,
          }),
        );
      }
    }
  }
}
