// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

import {rootSelector} from './rootSelector';

export const pageNumber = (state: RootState) => rootSelector(state).pageNumber;
