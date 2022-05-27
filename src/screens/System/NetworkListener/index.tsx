// SPDX-License-Identifier: BUSL-1.1

import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {isAppActive} from '@utils/helpers';
import {checkNetwork} from '@utils/checkNetwork';

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
