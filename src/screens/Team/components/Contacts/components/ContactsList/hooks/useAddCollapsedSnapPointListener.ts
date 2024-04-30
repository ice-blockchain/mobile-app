// SPDX-License-Identifier: ice License 1.0

import {BottomSheetSectionListMethods} from '@components/BottomSheet';
import {AGENDA} from '@screens/Team/constants';
import {useEffect, useRef} from 'react';

export const useAddCollapsedSnapPointListener = ({
  addListener,
  hasSections,
}: {
  addListener: (key: string, addListener: () => void) => void;
  hasSections: boolean;
}) => {
  const bottomSheetRef = useRef<BottomSheetSectionListMethods>(null);
  useEffect(() => {
    addListener(AGENDA, () => {
      if (bottomSheetRef.current && hasSections) {
        bottomSheetRef.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
        });
      }
    });
  }, [bottomSheetRef, addListener, hasSections]);
  return {bottomSheetRef};
};
