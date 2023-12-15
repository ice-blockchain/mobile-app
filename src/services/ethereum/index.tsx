// SPDX-License-Identifier: ice License 1.0

import {
  Address,
  createPublicClient,
  GetBytecodeErrorType,
  http,
  isAddress,
} from 'viem';
import {mainnet} from 'viem/chains';

export const isValidEthereumAddress = (address: string): boolean => {
  return isAddress(address);
};

export const ethereumMainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const isEoaEthereumAddress = async (
  address: string,
): Promise<boolean> => {
  const code = await ethereumMainnetClient.getBytecode({
    address: address as Address,
  });
  return !code;
};

export type IsEoaEthereumAddressError = GetBytecodeErrorType;
