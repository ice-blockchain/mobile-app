// SPDX-License-Identifier: ice License 1.0

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
    return (
      String.fromCodePoint(givenName.codePointAt(0) ?? 0) +
      String.fromCodePoint(familyName.codePointAt(0) ?? 0)
    );
  } else {
    return givenName
      .split(' ')
      .reduce(
        (acr, word) =>
          acr.length < 2
            ? acr + String.fromCodePoint(word.codePointAt(0) ?? 0)
            : acr,
        '',
      );
  }
};
