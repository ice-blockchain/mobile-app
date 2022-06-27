// SPDX-License-Identifier: BUSL-1.1

import {ContactById} from '@store/modules/Team/reducer';
import {createAction} from '@store/utils/actions/createAction';

const SET_PHONE_NUMBER_VERIFIED = createAction('SET_PHONE_NUMBER_VERIFIED', {
  STATE: () => {},
});
const INVITE_CONTACT = createAction('INVITE_CONTACT', {
  STATE: (id: string) => ({id}),
});

const SET_CONTACTS_BY_IDS = createAction('SET_CONTACTS_BY_IDS', {
  STATE: (contactsByIds: ContactById) => ({contactsByIds}),
});
const SET_CONTACTS_IDS = createAction('SET_CONTACTS_IDS', {
  STATE: (contactsIds: string[]) => ({contactsIds}),
});

export const TeamActions = Object.freeze({
  SET_PHONE_NUMBER_VERIFIED,
  INVITE_CONTACT,
  SET_CONTACTS_BY_IDS,
  SET_CONTACTS_IDS,
});
