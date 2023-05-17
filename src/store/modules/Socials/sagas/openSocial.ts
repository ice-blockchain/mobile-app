// SPDX-License-Identifier: ice License 1.0

import {dayjs} from '@services/dayjs';
import {userIdSelector} from '@store/modules/Account/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialData} from '@store/modules/Socials/data';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {SocialType} from '@store/modules/Socials/types';
import {openSocial} from '@store/modules/Socials/utils/openSocial';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {Linking} from 'react-native';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* openSocialSaga(typeToShow: SocialType) {
  const authenticatedUsedId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );

  const result: SagaReturnType<typeof openSocial> = yield call(
    openSocial,
    typeToShow,
  );

  const socialsState: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(authenticatedUsedId));
  let socials = [...socialsState];

  /*
   * if user clicked on "share", we mark current social as shared
   */

  if (result === 'yes') {
    socials = socials.map(social => {
      if (social.type === typeToShow) {
        return {...social, shared: true};
      }
      return social;
    });

    yield put(
      SocialsActions.SET_SOCIALS.STATE.create({
        userId: authenticatedUsedId,
        socials,
      }),
    );

    let linkApp = socialData[typeToShow].linkApp;

    yield put(
      TokenomicsActions.UPDATE_FORCE_START_MINING.STATE.create({
        forceStartMining: true,
      }),
    );
    if (typeToShow === 'tiktok') {
      /*
       * TikTok doesn't support canOpenURL
       */
      Linking.openURL(linkApp);
    } else {
      Linking.canOpenURL(linkApp).then(supported => {
        if (supported) {
          Linking.openURL(linkApp);
        }
        Linking.openURL(socialData[typeToShow].linkWeb);
      });
    }
    return {status: 'opened'};
  } else {
    /*
     * user clicked on "close", we reschedule current social to be shown
     * last in order
     */
    const notSharedSocials = socials.filter(social => !social.shared);

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

      const actualSocials: SagaReturnType<
        ReturnType<typeof socialsByUserIdSelector>
      > = yield select(socialsByUserIdSelector(authenticatedUsedId));

      socials = actualSocials.map(social => {
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
          socials,
        }),
      );
    }
    return {status: 'closed'};
  }
}
