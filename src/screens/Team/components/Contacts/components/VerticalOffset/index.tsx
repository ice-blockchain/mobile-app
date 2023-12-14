// SPDX-License-Identifier: ice License 1.0

import {BottomSheetScrollView} from '@components/BottomSheet';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
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
