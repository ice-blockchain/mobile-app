// SPDX-License-Identifier: ice License 1.0

import {useIsTabNavigation} from '@navigation/hooks/useIsTabNavigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';

export const useScreenTransitionEnd = () => {
  const isTabNavigation = useIsTabNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<{}>>();
  const [transitionEnd, setTransitionEnd] = useState(isTabNavigation);

  useEffect(() => {
    if (!transitionEnd) {
      return navigation.addListener('transitionEnd', () => {
        setTransitionEnd(true);
      });
    }
  }, [navigation, transitionEnd]);

  return {transitionEnd};
};
