// SPDX-License-Identifier: ice License 1.0

import * as Keychain from 'react-native-keychain';

export const setSecureValue = (key: string, value: string) => {
  return Keychain.setGenericPassword(key, value, {
    service: key,
  });
};

export const getSecureValue = async (key: string) => {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return result.password;
  }
  return false;
};

export const removeSecureValue = (key: string) => {
  return Keychain.resetGenericPassword({service: key});
};
