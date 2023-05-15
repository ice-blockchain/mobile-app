// SPDX-License-Identifier: ice License 1.0

import {
  BACKGROUND_TASKS,
  BackgroundTask,
} from '@store/modules/BackgroundTasks/config';
import BackgroundFetch from 'react-native-background-fetch';
import {all, call} from 'redux-saga/effects';

export function* initBackgroundTasksSaga() {
  yield call(
    BackgroundFetch.configure,
    {},
    taskId => {
      switch (taskId) {
        case BackgroundTask.ContactsSync: {
          console.log(taskId);
          // do stuff
        }
      }
      BackgroundFetch.finish(taskId);
    },
    taskId => BackgroundFetch.finish(taskId),
  );

  yield all(
    BACKGROUND_TASKS.map(task => call(BackgroundFetch.scheduleTask, task)),
  );
}
