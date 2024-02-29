// SPDX-License-Identifier: ice License 1.0

import {AppRegistry} from 'react-native';
import 'react-native-url-polyfill/auto';
import {name as appName} from './app.json';
import {App} from './src/App';

AppRegistry.registerComponent(appName, () => App);
