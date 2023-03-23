// SPDX-License-Identifier: ice License 1.0

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';

export const useScreenTransitionEnd = () => {
  const navigation = useNavigation<NativeStackNavigationProp<{}>>();
  const [transitionEnd, setTransitionEnd] = useState(false);

  useEffect(() => {
    if (!transitionEnd) {
      return navigation.addListener('transitionEnd', () => {
        setTransitionEnd(true);
      });
    }
  }, [navigation, transitionEnd]);

  return {transitionEnd};
};
