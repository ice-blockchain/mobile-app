// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {createAction} from '@store/utils/actions/createAction';
import {Contact} from 'react-native-contacts';

const INVITE_CONTACT = createAction('INVITE_CONTACT', {
  START: (id: string) => ({id}),
  SUCCESS: (id: string) => ({id}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SYNC_CONTACTS = createAction('SYNC_CONTACTS', {
  START: true,
  SUCCESS: (contacts: Contact[]) => ({contacts}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

const SEARCH_USERS = createAction('SEARCH_USERS', {
  START: (query: string) => ({query}),
  SUCCESS: (contacts: User[]) => ({contacts}),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const TeamActions = Object.freeze({
  INVITE_CONTACT,
  SYNC_CONTACTS,
  SEARCH_USERS,
});
