// SPDX-License-Identifier: BUSL-1.1

import {Contact} from 'react-native-contacts';

//TODO::complete
export const getContactName = (contact: Contact) => {
  return contact.givenName;
};

//TODO::complete
export const getContactAcronym = (contact: Contact) => {
  return contact.givenName.charAt(0) + contact.familyName.charAt(0);
};
