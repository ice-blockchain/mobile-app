// SPDX-License-Identifier: ice License 1.0

import {isAddress} from 'web3-validator/lib/esm/validation/address';

export const verifyEthereumAddress = (address: string): boolean => {
  return isAddress(address);
};
