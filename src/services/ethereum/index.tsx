// SPDX-License-Identifier: ice License 1.0

import {
  Address,
  checksumAddress,
  createPublicClient,
  GetBytecodeErrorType,
  http,
  isAddress,
} from 'viem';
import {bsc} from 'viem/chains';

export const isValidEthereumAddress = (address: string): boolean => {
  return isAddress(address);
};

export const bscClient = createPublicClient({
  chain: bsc,
  transport: http(),
});

export const isEoaEthereumAddress = async (
  address: string,
): Promise<boolean> => {
  const code = await bscClient.getBytecode({
    address: address as Address,
  });
  return !code;
};

export const isChecksummedAddress = (address: string): boolean => {
  return checksumAddress(address as Address) === address;
};

export type IsEoaEthereumAddressError = GetBytecodeErrorType;
