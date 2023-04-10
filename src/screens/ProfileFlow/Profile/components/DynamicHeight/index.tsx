// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import BottomSheet, {
  BottomSheetProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import React, {ReactNode} from 'react';

interface Props extends BottomSheetProps {
  children: ReactNode;
}

export const DynamicHeight = ({children, ...props}: Props) => {
  const tabBarOffset = useBottomTabBarOffsetStyle();

  return (
    <BottomSheet
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag
      overDragResistanceFactor={10}
      backgroundStyle={commonStyles.baseSubScreen}
      activeOffsetY={[-5, 5]}
      {...props}>
      <BottomSheetScrollView
        style={commonStyles.flexOne}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabBarOffset.current}>
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
