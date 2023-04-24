// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
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
import {getErrorMessage} from '@utils/errors';
import {Linking} from 'react-native';
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

        typeToShow = firstSocialToShow.type;
      }
    } else {
      /**
       * if user has no socials, we create default socials
       */
      const defaultSocials: SocialsShare[] = socialsOrder.map((type, index) => {
        return {type, shared: false, dateToShow: getNextDate(index)};
      });

      yield put(
        SocialsActions.SOCIALS_LOAD.SUCCESS.create({
          socials: defaultSocials,
          userId: authenticatedUsedId,
        }),
      );

      typeToShow = socialsOrder[0]; // show first social
    }

    if (typeToShow) {
      const result: SagaReturnType<typeof openSocial> = yield call(
        openSocial,
        typeToShow,
      );

      const userSocials: SocialsShare[] = yield select(
        socialsByUserIdSelector(authenticatedUsedId),
      );

      /*
       * if user clicked on "share", we mark current social as shared
       */

      if (result === 'yes') {
        const updatedSocials: SocialsShare[] = userSocials.map(social => {
          if (social.type === typeToShow) {
            return {...social, shared: true};
          }

          return social;
        });

        yield put(
          SocialsActions.SOCIALS_LOAD.SUCCESS.create({
            userId: authenticatedUsedId,
            socials: updatedSocials,
          }),
        );

        let appLink = '';
        let webLink = '';

        switch (typeToShow) {
          case 'facebook':
            appLink = LINKS.FACEBOOK_PAGE;
            webLink = LINKS.FACEBOOK_WEB_PAGE;
            break;
          case 'instagram':
            appLink = LINKS.INSTAGRAM_PAGE;
            webLink = LINKS.INSTAGRAM_WEB_PAGE;
            break;
          case 'linkedin':
            appLink = LINKS.LINKEDIN_PAGE;
            webLink = LINKS.LINKEDIN_WEB_PAGE;
            break;
          case 'youtube':
            appLink = LINKS.YOUTUBE_PAGE;
            webLink = LINKS.YOUTUBE_WEB_PAGE;
            break;
          case 'tiktok':
            /*
             * for TikTok we have only web link
             */
            appLink = LINKS.TIKTOK_PAGE;
            webLink = LINKS.TIKTOK_PAGE;
            break;
        }

        if (typeToShow !== 'tiktok') {
          Linking.canOpenURL(appLink).then(supported => {
            if (supported) {
              return Linking.openURL(appLink);
            } else {
              return Linking.openURL(webLink);
            }
          });
        } else {
          /*
           * TikTok doesn't support canOpenURL
           */
          return Linking.openURL(appLink);
        }
      } else {
        /*
         * user clicked on "close", we reschedule current social to be shown
         * last in order
         */
        const latestShowDateSocial = userSocials.reduce((a, b) =>
          a.dateToShow > b.dateToShow ? a : b,
        );

        if (latestShowDateSocial) {
          const updatedSocials: SocialsShare[] = userSocials.map(social => {
            if (social.type === typeToShow) {
              return {
                ...social,
                dateToShow: getNextDate(1, latestShowDateSocial.dateToShow),
              };
            }
            return social;
          });
          yield put(
            SocialsActions.SOCIALS_LOAD.SUCCESS.create({
              userId: authenticatedUsedId,
              socials: updatedSocials,
            }),
          );
        } else {
        }
      }
    }
  } catch (error) {
    yield put(
      SocialsActions.SOCIALS_LOAD.FAILED.create(getErrorMessage(error)),
    );
    throw error;
  }
}
