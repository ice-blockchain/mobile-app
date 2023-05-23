// SPDX-License-Identifier: ice License 1.0

import {RootState} from '@store/rootReducer';

export const contactsSelector = (state: RootState) => state.contacts.contacts;

export const syncedContactsNumbersSelector = (state: RootState) =>
  state.contacts.syncedContactsPhoneNumbers;
