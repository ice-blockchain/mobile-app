// SPDX-License-Identifier: ice License 1.0

import {Address, createPublicClient, http, isAddress} from 'viem';
import {mainnet} from 'viem/chains';

export const isValidEthereumAddress = (address: string): boolean => {
  return isAddress(address);
};

export const isEoaEthereumAddress = async (
  address: string,
): Promise<boolean> => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const code = await client.getBytecode({address: address as Address});
  return !code;
};
