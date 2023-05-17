// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const CONTACTS_SYNC_BACKGROUND_TASK = createAction(
  'CONTACTS_SYNC_BACKGROUND_TASK',
  {
    STATE: (payload: {finishTask: () => void}) => payload,
  },
);

export const BackgroundTasksActions = Object.freeze({
  CONTACTS_SYNC_BACKGROUND_TASK,
});
