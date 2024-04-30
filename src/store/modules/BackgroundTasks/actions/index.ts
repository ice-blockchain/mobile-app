// SPDX-License-Identifier: ice License 1.0

import {createAction} from '@store/utils/actions/createAction';

const SYNC_CONTACTS_BACKGROUND_TASK = createAction(
  'SYNC_CONTACTS_BACKGROUND_TASK',
  {
    STATE: (payload: {finishTask: () => void}) => payload,
  },
);

export const BackgroundTasksActions = Object.freeze({
  SYNC_CONTACTS_BACKGROUND_TASK,
});
