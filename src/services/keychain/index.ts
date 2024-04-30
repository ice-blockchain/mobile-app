// SPDX-License-Identifier: ice License 1.0

import * as Keychain from 'react-native-keychain';

/**
 * Using FB storage because with a default one, on some devices
 * "Could not decrypt data with alias: ..." error is thrown.
 * https://github.com/oblador/react-native-keychain/issues/567
 */
export const setSecureValue = (key: string, value: string) => {
  return Keychain.setGenericPassword(key, value, {
    service: key,
    storage: Keychain.STORAGE_TYPE.FB,
  });
};

export const getSecureValue = async (key: string) => {
  const result = await Keychain.getGenericPassword({
    service: key,
    storage: Keychain.STORAGE_TYPE.FB,
  });
  if (result) {
    return result.password;
  }
  return false;
};

export const removeSecureValue = (key: string) => {
  return Keychain.resetGenericPassword({service: key});
};
