// SPDX-License-Identifier: ice License 1.0

import {StatusNoticeData} from '@store/modules/StatusNotice/types';
import {createAction} from '@store/utils/actions/createAction';

const SET_STATUS_NOTICE_DATA = createAction('SET_STATUS_NOTICE_DATA', {
  STATE: ({data}: {data: StatusNoticeData | null}) => ({data}),
});

const SET_STATUS_NOTICE_HEIGHT = createAction('SET_STATUS_NOTICE_HEIGHT', {
  STATE: (height: number) => ({height}),
});

export const StatusNoticeActions = Object.freeze({
  SET_STATUS_NOTICE_DATA,
  SET_STATUS_NOTICE_HEIGHT,
});
