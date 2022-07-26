// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const getIceUsersSelector = (state: RootState) => state.team.iceUsers;

export const getContactsSelector = (state: RootState) => state.team.contacts;
