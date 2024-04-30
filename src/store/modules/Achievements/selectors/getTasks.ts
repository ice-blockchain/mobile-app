// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const getTasks = (state: RootState) => rootSelector(state).tasks;
