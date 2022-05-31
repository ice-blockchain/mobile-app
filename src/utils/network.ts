// SPDX-License-Identifier: BUSL-1.1

import NetInfo from '@react-native-community/netinfo';

export async function checkNetwork() {
  const networkStatus = await NetInfo.fetch();
  return networkStatus.isConnected;
}
