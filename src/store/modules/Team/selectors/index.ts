// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';
import {createSelector} from 'reselect';

const teamRootSelector = (state: RootState) => state.team;

export const selectorIsPhoneNumberVerified = createSelector(
  teamRootSelector,
  team => team.isPhoneNumberVerified,
);
