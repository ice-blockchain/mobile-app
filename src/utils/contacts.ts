// SPDX-License-Identifier: BUSL-1.1

import {Contact} from 'react-native-contacts';

//TODO::complete
export const getContactName = (contact: Contact) => {
  return contact.givenName;
};
