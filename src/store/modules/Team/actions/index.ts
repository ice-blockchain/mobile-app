// SPDX-License-Identifier: BUSL-1.1

import {ContactById} from '@store/modules/Team/reducer';
import {IFormattedContact} from '@store/modules/Team/sagas/getContactsSaga';
import {createAction} from '@store/utils/actions/createAction';

export interface UserSearchResult {
  active: boolean;
  city: string;
  country: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  pingAllowed: boolean;
  profilePictureURL: string;
  referralType: string;
  username: string;
}

const INVITE_CONTACT = createAction('INVITE_CONTACT', {
  START: (id: string) => ({id}),
  SUCCESS: (id: string) => ({id}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SET_CONTACTS_BY_IDS = createAction('SET_CONTACTS_BY_IDS', {
  STATE: (contactsByIds: ContactById) => ({contactsByIds}),
});
const SET_CONTACTS_IDS = createAction('SET_CONTACTS_IDS', {
  STATE: (contactsIds: string[]) => ({contactsIds}),
});

const GET_CONTACTS = createAction('GET_CONTACTS', {
  START: true,
  SUCCESS: (contacts: IFormattedContact[]) => ({contacts}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SEARCH_USERS = createAction('SEARCH_USERS', {
  START: (query: string, signal?: AbortSignal) => ({query, signal}),
  SUCCESS: (contacts: UserSearchResult[]) => ({contacts}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const TeamActions = Object.freeze({
  INVITE_CONTACT,
  SET_CONTACTS_BY_IDS,
  SET_CONTACTS_IDS,
  GET_CONTACTS,
  SEARCH_USERS,
});
