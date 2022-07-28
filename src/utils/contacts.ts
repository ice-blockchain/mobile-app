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

//TODO::complete
export const getColorForContact = (contact: Contact) => {
  console.log('%c contact', 'background: #ff6347', contact);
  return '#0f0f0f';
};
