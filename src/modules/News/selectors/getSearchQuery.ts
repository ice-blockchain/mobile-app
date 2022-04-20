// SPDX-License-Identifier: BUSL-1.1

import {RootState} from 'src/rootReducer';
import rootSelector from './rootSelector';

export default (state: RootState) => rootSelector(state).searchQuery;
