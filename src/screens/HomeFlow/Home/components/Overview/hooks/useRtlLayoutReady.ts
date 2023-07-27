// SPDX-License-Identifier: ice License 1.0

import {getActiveOffset} from '@screens/HomeFlow/Home/components/Overview/hooks/useHandleActiveOverviewCardParam';
import {isRTL} from '@translations/i18n';
import React, {RefObject, useCallback, useEffect} from 'react';
import {InteractionManager} from 'react-native';
import Animated from 'react-native-reanimated';
import {isIOS} from 'rn-units';

type Props = {
  scrollViewRef: RefObject<Animated.ScrollView>;
};

export function useRtlLayoutReady({scrollViewRef}: Props) {
  const [layoutReady, setLayoutReady] = React.useState(false);
  const onLayout = useCallback(() => {
    if (isRTL) {
      setLayoutReady(true);
    }
  }, []);
  useEffect(() => {
    if (layoutReady) {
      InteractionManager.runAfterInteractions(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: getActiveOffset(isIOS ? 'profile' : 'adoption'),
            y: 0,
            animated: true,
          });
        }
      });
    }
  }, [layoutReady, scrollViewRef]);

  return {onLayout};
}
