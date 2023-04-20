// SPDX-License-Identifier: ice License 1.0

import {StatusNoticeActions} from '@store/modules/StatusNotice/actions';
import {StatusNoticeData} from '@store/modules/StatusNotice/types';
import produce from 'immer';

export interface State {
  data: StatusNoticeData | null;
  statusNoticeHeight: number;
}

type Actions = ReturnType<
  | typeof StatusNoticeActions.SET_STATUS_NOTICE_DATA.STATE.create
  | typeof StatusNoticeActions.SET_STATUS_NOTICE_HEIGHT.STATE.create
>;

const INITIAL_STATE: State = {
  data: null,
  statusNoticeHeight: 0,
};

export function statusNotice(state = INITIAL_STATE, action: Actions): State {
  return produce(state, draft => {
    switch (action.type) {
      case StatusNoticeActions.SET_STATUS_NOTICE_DATA.STATE.type:
        draft.data = action.payload.data;
        if (!action.payload.data) {
          draft.statusNoticeHeight = 0;
        }
        break;
      case StatusNoticeActions.SET_STATUS_NOTICE_HEIGHT.STATE.type:
        draft.statusNoticeHeight = action.payload.height;
        break;
    }
  });
}
