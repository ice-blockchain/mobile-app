// SPDX-License-Identifier: BUSL-1.1

/**
 * Returns display name for a Contact
 * on Android versions below 8 the entire display name is passed in the givenName field, middleName and familyName will be ""
 */
export const getContactName = ({
  givenName = '',
  familyName = '',
}: {
  givenName: string;
  familyName: string;
}) => {
  return familyName ? `${givenName} ${familyName}` : givenName;
};

/**
 * Returns Acronym for a Contact
 * e.g. John Smith -> JS
 */
export const getContactAcronym = ({
  givenName = '',
  familyName = '',
}: {
  givenName: string;
  familyName: string;
}) => {
  if (familyName) {
    return givenName.charAt(0) + familyName.charAt(0);
  } else {
    return givenName
      .split(' ')
      .reduce((acr, word) => (acr.length < 2 ? acr + word.charAt(0) : acr), '');
  }
};
