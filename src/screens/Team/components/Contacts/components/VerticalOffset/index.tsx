// SPDX-License-Identifier: ice License 1.0

import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import React, {ReactNode} from 'react';
import {isIOS} from 'rn-units';

export const VerticalOffset = ({children}: {children: ReactNode}) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();
  return (
    // Using `position` behavior for KeyboardAvoider cuz of useFocusAndroidSoftInputMode
    <KeyboardAvoider behavior={isIOS ? 'padding' : 'position'}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffset.current}>
        {children}
      </BottomSheetScrollView>
    </KeyboardAvoider>
  );
};
