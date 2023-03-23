// SPDX-License-Identifier: ice License 1.0

import NetInfo from '@react-native-community/netinfo';

export async function checkNetwork() {
  const networkStatus = await NetInfo.fetch();
  return networkStatus.isConnected;
}
