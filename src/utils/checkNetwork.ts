// SPDX-License-Identifier: BUSL-1.1

import NetInfo from '@react-native-community/netinfo';

export default async function checkNetwork() {
  const networkStatus = await NetInfo.fetch();
  return networkStatus.isConnected;
}
