// SPDX-License-Identifier: ice License 1.0

import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import React, {ReactNode} from 'react';

export const VerticalOffset = ({children}: {children: ReactNode}) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();
  return (
    <KeyboardAvoider>
      <BottomSheetScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffset.current}>
        {children}
      </BottomSheetScrollView>
    </KeyboardAvoider>
  );
};
