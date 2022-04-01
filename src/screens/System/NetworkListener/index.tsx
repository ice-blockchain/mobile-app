import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import checkNetwork from 'src/utils/checkNetwork';
import {isAppActive} from 'src/utils/helpers';

export default function NetworkListener() {
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
