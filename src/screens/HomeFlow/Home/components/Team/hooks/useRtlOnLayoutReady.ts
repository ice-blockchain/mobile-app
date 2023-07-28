// SPDX-License-Identifier: ice License 1.0

import {isRTL} from '@translations/i18n';
import React, {useCallback, useEffect} from 'react';
import {InteractionManager} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAnimatedRef} from 'react-native-reanimated';

export function useRtlOnLayoutReady() {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const onLayout = useCallback(() => {
    if (isRTL) {
      setLayoutReady(true);
    }
  }, []);
  const flatListRef = useAnimatedRef<FlatList>();
  useEffect(() => {
    if (layoutReady) {
      InteractionManager.runAfterInteractions(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
      });
    }
  }, [layoutReady, flatListRef]);

  return {onLayout, flatListRef};
}
