// SPDX-License-Identifier: BUSL-1.1

import NetInfo from '@react-native-community/netinfo';
import {isAppActive} from '@utils/application';
import {checkNetwork} from '@utils/network';
import {useEffect} from 'react';

export function NetworkListener() {
  const check = async () => {
    const active = isAppActive();
    if (!active) {
      return;
    }
    await checkNetwork();
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(check);
    return unsubscribe();
  }, []);

  return null;
}
