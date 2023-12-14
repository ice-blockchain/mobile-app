// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {BottomSheetFlatListMethods} from '@components/BottomSheet';
import {useEffect, useRef} from 'react';

export const useAddCollapsedSnapPointListener = ({
  addListener,
  referralType,
}: {
  addListener: (key: string, addListener: () => void) => void;
  referralType: ReferralType;
}) => {
  const bottomSheetRef = useRef<BottomSheetFlatListMethods>(null);
  useEffect(() => {
    addListener(referralType, () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.scrollToOffset({animated: true, offset: 0});
      }
    });
  }, [bottomSheetRef, addListener, referralType]);
  return {bottomSheetRef};
};
