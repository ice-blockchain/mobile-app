// SPDX-License-Identifier: ice License 1.0

import BackgroundFetch from 'react-native-background-fetch';

export enum BackgroundTask {
  ContactsSync = 'io.ice.contacts_sync',
}

export const BACKGROUND_TASKS = [
  {
    taskId: BackgroundTask.ContactsSync,
    delay: 60 * 60 * 1000, // milliseconds
    periodic: true,
    stopOnTerminate: false,
    startOnBoot: true,
    forceAlarmManager: false,
    enableHeadless: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    requiresDeviceIdle: true,
  },
];
