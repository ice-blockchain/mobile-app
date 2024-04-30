// SPDX-License-Identifier: ice License 1.0

import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useOnHardwareBack({
  callback,
  preventDefault,
}: {
  callback: () => void;
  preventDefault?: boolean;
}) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        callback();
        return !!preventDefault;
      },
    );
    return () => backHandler.remove();
  }, [callback, preventDefault]);
}
