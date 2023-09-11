// SPDX-License-Identifier: ice License 1.0

import {SOCIALS_POPUP_INTERVAL_SEC} from '@constants/timeouts';
import {dayjs} from '@services/dayjs';
import {
  isAuthorizedSelector,
  userIdSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {SocialsActions} from '@store/modules/Socials/actions';
import {socialData} from '@store/modules/Socials/data';
import {socialsByUserIdSelector} from '@store/modules/Socials/selectors';
import {SocialsShare} from '@store/modules/Socials/types';
import {openSocial} from '@store/modules/Socials/utils/openSocial';
import {
  miningStateSelector,
  miningSummarySelector,
} from '@store/modules/Tokenomics/selectors';
import {waitForSelector} from '@store/utils/sagas/effects';
import {openLink} from '@utils/device';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* showSocialSaga() {
  const appReady: SagaReturnType<typeof appReadyToShowSocials> = yield call(
    appReadyToShowSocials,
  );

  if (!appReady) {
    return;
  }

  const socialToShare: SagaReturnType<typeof pullSocialToShare> = yield call(
    pullSocialToShare,
  );

  if (!socialToShare) {
    return;
  }

  const openSocialResult: SagaReturnType<typeof openSocial> = yield call(
    openSocial,
    socialToShare.type,
  );

  const updatedSocialsQueue: SagaReturnType<typeof updateSocialsQueue> =
    yield call(updateSocialsQueue, socialToShare);

  if (openSocialResult === 'yes') {
    yield call(openSocialLink, socialToShare);
    yield call(
      saveSocialsQueue,
      updatedSocialsQueue.map(social =>
        social.type === socialToShare.type ? {...social, shared: true} : social,
      ),
    );
  } else {
    yield call(saveSocialsQueue, updatedSocialsQueue);
  }
}

function* appReadyToShowSocials() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );
  const isAppActive: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAppActiveSelector,
  );

  yield call(waitForSelector, state => !!miningSummarySelector(state));

  const miningState: ReturnType<typeof miningStateSelector> = yield select(
    miningStateSelector,
  );

  return isAppActive && isAuthorized && miningState === 'active';
}

function* pullSocialToShare() {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  const socialsQueue: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(userId));

  const socialToShare = socialsQueue.find(social => !social.shared);

  if (socialToShare && dayjs().isAfter(socialToShare.dateToShow)) {
    return socialToShare;
  }
  return null;
}

function* updateSocialsQueue(socialToShare: SocialsShare) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  const socialsQueue: SagaReturnType<
    ReturnType<typeof socialsByUserIdSelector>
  > = yield select(socialsByUserIdSelector(userId));
  const updatedQueue = socialsQueue.reduce<SocialsShare[]>(
    (socials, social) => {
      /**
       * Keep already shared socials as is
       */
      if (social.shared) {
        return [...socials, social];
      }
      /**
       * Omit the social that we're going to show
       * Because we will add it to the end of the queue
       */
      if (social.type === socialToShare.type) {
        return socials;
      }
      /**
       * Update dateToShow for the future socials
       */
      return [
        ...socials,
        {
          ...social,
          dateToShow: dayjs()
            .add(SOCIALS_POPUP_INTERVAL_SEC, 'seconds')
            .toISOString(),
        },
      ];
    },
    [],
  );
  updatedQueue.push(socialToShare);
  return updatedQueue;
}

function* saveSocialsQueue(socialsQueue: SocialsShare[]) {
  const userId: ReturnType<typeof userIdSelector> = yield select(
    userIdSelector,
  );
  yield put(
    SocialsActions.SET_SOCIALS.STATE.create({
      userId,
      socials: socialsQueue,
    }),
  );
}

function* openSocialLink(socialToShare: SocialsShare) {
  const opened: SagaReturnType<typeof openLink> = yield call(
    openLink,
    socialData[socialToShare.type].linkApp,
  );
  if (!opened) {
    yield call(openLink, socialData[socialToShare.type].linkWeb);
  }
}
