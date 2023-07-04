// SPDX-License-Identifier: ice License 1.0

import {Api} from '@api/index';
import {
  isAuthorizedSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {isAppActiveSelector} from '@store/modules/AppCommon/selectors';
import {StatusNoticeActions} from '@store/modules/StatusNotice/actions';
import {StatusNoticeData} from '@store/modules/StatusNotice/types';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkStatusNoticeSaga() {
  const isAuthorized: ReturnType<typeof isAuthorizedSelector> = yield select(
    isAuthorizedSelector,
  );
  const isAppActive: ReturnType<typeof isAppActiveSelector> = yield select(
    isAppActiveSelector,
  );
  if (!isAuthorized || !isAppActive) {
    return null;
  }

  const noticeData: SagaReturnType<typeof Api.statusNotice.getNotice> =
    yield call(Api.statusNotice.getNotice);
  const user: ReturnType<typeof userSelector> = yield select(userSelector);
  const statusNoticeData: StatusNoticeData = {
    link: noticeData?.link,
    gradientColors: noticeData?.gradientColors,
    newsData: noticeData?.newsData,
    icon: noticeData?.icon,
  };

  if (noticeData?.data) {
    statusNoticeData.data =
      noticeData.data[user?.language ?? ''] ?? noticeData.data.en;
  }
  if (statusNoticeData?.data || statusNoticeData?.newsData) {
    yield put(
      StatusNoticeActions.SET_STATUS_NOTICE_DATA.STATE.create({
        data: statusNoticeData,
      }),
    );
  } else {
    yield put(
      StatusNoticeActions.SET_STATUS_NOTICE_DATA.STATE.create({
        data: null,
      }),
    );
  }
}
