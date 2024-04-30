// SPDX-License-Identifier: ice License 1.0

import {initBackgroundTasksSaga} from '@store/modules/BackgroundTasks/sagas/initBackgroundTasksSaga';
import {fork} from 'redux-saga/effects';

export const backgroundTasksWatchers = [fork(initBackgroundTasksSaga)];
