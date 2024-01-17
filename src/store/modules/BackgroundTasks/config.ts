// SPDX-License-Identifier: ice License 1.0

import BackgroundFetch, {TaskConfig} from 'react-native-background-fetch';

export enum BackgroundTask {
  SyncContacts = 'io.ice.bg_task.sync_contacts',
}

export const BACKGROUND_TASKS: TaskConfig[] = [
  {
    taskId: BackgroundTask.SyncContacts,
    delay: 24 * 60 * 60 * 1000, // milliseconds
    periodic: true,
    stopOnTerminate: false,
    startOnBoot: true,
    forceAlarmManager: false,
    enableHeadless: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
  },
];
