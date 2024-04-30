// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {store} from '@store/configureStore';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {BackgroundTask} from '@store/modules/BackgroundTasks/config';
import BackgroundFetch, {HeadlessEvent} from 'react-native-background-fetch';

/**
 * [Android only] Handling registered background events after app termination
 */
const BackgroundTasksHeadlessTask = async ({
  taskId,
  timeout,
}: HeadlessEvent) => {
  if (timeout) {
    // The task has exceeded its allowed running-time
    BackgroundFetch.finish(taskId);
    return;
  }

  switch (taskId) {
    case BackgroundTask.SyncContacts: {
      store.dispatch(
        BackgroundTasksActions.SYNC_CONTACTS_BACKGROUND_TASK.STATE.create({
          finishTask: () => BackgroundFetch.finish(taskId),
        }),
      );
      break;
    }
    case 'react-native-background-fetch': {
      BackgroundFetch.finish(taskId);
      break;
    }
    default: {
      logError(new Error(`Unknown background task with id ${taskId}`));
      BackgroundFetch.finish(taskId);
    }
  }
};

export const registerBackgroundTasksHeadlessTask = () => {
  BackgroundFetch.registerHeadlessTask(BackgroundTasksHeadlessTask);
};
