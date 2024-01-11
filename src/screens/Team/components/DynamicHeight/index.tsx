// SPDX-License-Identifier: ice License 1.0

import BottomSheet from '@components/BottomSheet';
import {isLightDesign} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {useSafeAreaFrame} from '@hooks/useSafeAreaFrame';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {TeamTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {INFO_HEIGHT} from '@screens/Team/components/Header/components/Info';
import {
  SEARCH_HEIGHT,
  SEARCH_INPUT_TOP_OFFSET,
} from '@screens/Team/components/Header/components/Search';
import {SEARCH_RESULTS_OFFSET} from '@screens/Team/components/SearchResults';
import React, {ReactNode, useEffect, useMemo, useRef} from 'react';
import {SharedValue} from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  isSearchActive: boolean;
  animatedIndex?: SharedValue<number>;
};

export const DynamicHeight = ({
  children,
  isSearchActive,
  animatedIndex,
}: Props) => {
  const route = useRoute<RouteProp<TeamTabStackParamList, 'Team'>>();

  const sheetRef = useRef<BottomSheet>(null);
  const {top: topInset} = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const positions = useMemo(() => {
    return {
      expanded: frame.height - topInset - SEARCH_INPUT_TOP_OFFSET,
      collapsed: frame.height - topInset - SEARCH_HEIGHT - INFO_HEIGHT,
      search: frame.height - topInset - SEARCH_HEIGHT - SEARCH_RESULTS_OFFSET,
    };
  }, [frame.height, topInset]);

  const snapPoints = useMemo(
    () =>
      isSearchActive || isLightDesign
        ? [positions.search, positions.expanded]
        : [positions.collapsed, positions.expanded],
    [positions, isSearchActive],
  );

  const isKeyboardShown = useIsKeyboardShown();

  useEffect(() => {
    if (isKeyboardShown && !isSearchActive) {
      sheetRef.current?.snapToIndex(1);
    }

    if (isSearchActive) {
      sheetRef.current?.snapToPosition(positions.search);
    } else {
      sheetRef.current?.snapToIndex(0);
    }
  }, [isKeyboardShown, isSearchActive, positions.search]);

  useEffect(() => {
    if (route.params?.snapPoint != null) {
      sheetRef.current?.snapToIndex(route.params.snapPoint);
    }
  }, [route.params?.snapPoint]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag={true}
      animatedIndex={animatedIndex}
      overDragResistanceFactor={10}
      backgroundStyle={commonStyles.baseSubScreen}
      /**
       * This is required to let child PagerView handle horizontal swipes
       * by not activating BottomSheet's gesture handler for x axis
       * https://github.com/gorhom/react-native-bottom-sheet/issues/770#issuecomment-1072113936
       */
      activeOffsetX={[-1000, 1000]}
      activeOffsetY={[-5, 5]}>
      {children}
    </BottomSheet>
  );
};
