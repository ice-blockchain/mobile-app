// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import {store} from '@store/configureStore';
import {BackgroundTasksActions} from '@store/modules/BackgroundTasks/actions';
import {
  BACKGROUND_TASKS,
  BackgroundTask,
} from '@store/modules/BackgroundTasks/config';
import BackgroundFetch from 'react-native-background-fetch';
import DeviceInfo from 'react-native-device-info';
import {all, call, SagaReturnType} from 'redux-saga/effects';
import {isIOS} from 'rn-units';

export function* initBackgroundTasksSaga() {
  const isEmulator: SagaReturnType<typeof DeviceInfo.isEmulator> = yield call(
    DeviceInfo.isEmulator,
  );

  // BackgroundFetch doesn't work on simulators and throws an error
  if (isEmulator && isIOS) {
    return;
  }

  yield call(
    BackgroundFetch.configure,
    {
      minimumFetchInterval: 3.156e7, // don't run the default background fetch
    },
    taskId => {
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
    },
    taskId => BackgroundFetch.finish(taskId),
  );

  yield all(
    BACKGROUND_TASKS.map(task => call(BackgroundFetch.scheduleTask, task)),
  );
}
