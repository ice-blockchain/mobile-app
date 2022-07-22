// SPDX-License-Identifier: BUSL-1.1

import {RootState} from '@store/rootReducer';

export const selectorIsPhoneNumberVerified = (state: RootState) =>
  state.team.isPhoneNumberVerified;

export const getInvitedFriendsSelector = (state: RootState) =>
  state.team.invitedFriends;

export const getIceUsersSelector = (state: RootState) => state.team.iceUsers;

export const getContactsByIdsSelector = (state: RootState) =>
  state.team.contactsByIds;

export const getContactsIdsSelector = (state: RootState) =>
  state.team.contactsIds;
