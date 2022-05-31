// SPDX-License-Identifier: BUSL-1.1

import {AppState} from 'react-native';

export const isAppActive = () => AppState.currentState === 'active';
