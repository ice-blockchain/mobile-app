// SPDX-License-Identifier: ice License 1.0

import {Web3Context} from 'web3-core/lib/esm/web3_context';
import {isAddress} from 'web3-validator/lib/esm/validation/address';

export const isValidEthereumAddress = (address: string): boolean => {
  return true;
  return isAddress(address);
};

export const isEoaEthereumAddress = async (
  address: string,
): Promise<boolean> => {
  const web3 = new Web3Context('https://mainnet.infura.io');
  console.log('web3', web3);
  // const res = await web3.eth.getCode(address);
  // return res === '0x';
  return false;
};
