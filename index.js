// SPDX-License-Identifier: ice License 1.0

import {registerBackgroundTasksHeadlessTask} from '@store/modules/BackgroundTasks/headless';
import {registerBackgroundMessageHandler} from '@store/modules/PushNotifications/headless';
import {AppRegistry} from 'react-native';
import 'react-native-url-polyfill/auto';
import {name as appName} from './app.json';
import {App} from './src/App';

import {LoggingWrapper} from '@services/logging';

registerBackgroundTasksHeadlessTask();
registerBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => LoggingWrapper(App));
