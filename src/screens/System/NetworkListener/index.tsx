// SPDX-License-Identifier: BUSL-1.1

import NetInfo from '@react-native-community/netinfo';
import {checkNetwork} from '@utils/checkNetwork';
import {isAppActive} from '@utils/helpers';
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
