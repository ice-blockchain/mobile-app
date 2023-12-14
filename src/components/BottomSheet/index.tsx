// SPDX-License-Identifier: ice License 1.0

// eslint-disable-next-line no-restricted-imports
import BottomSheetOriginal, {BottomSheetProps} from '@gorhom/bottom-sheet';
import React, {forwardRef, memo, useMemo} from 'react';
import {isSharedValue} from 'react-native-reanimated';

interface Props extends BottomSheetProps {
  minHeight?: number | null;
}

export const BottomSheet: typeof BottomSheetOriginal = memo(
  forwardRef(({children, snapPoints, minHeight = 1, ...props}: Props, ref) => {
    // On android we have android:windowSoftInputMode="adjustResize"
    // that means that the height of the window decreases when the keyboard appears.
    // This in turn leads to recalculating of snap points and
    // in some cases we're getting negative values for small windows (negative values = crash).
    // Making sure that snap points are always greater than minHeight.
    const safeSnapPoints = useMemo(() => {
      return minHeight && !isSharedValue(snapPoints)
        ? snapPoints.map(point =>
            typeof point === 'number' ? Math.max(point, minHeight) : point,
          )
        : snapPoints;
    }, [minHeight, snapPoints]);

    return (
      <BottomSheetOriginal {...props} snapPoints={safeSnapPoints} ref={ref}>
        {children}
      </BottomSheetOriginal>
    );
  }),
);

declare type BottomSheet = BottomSheetOriginal;

export default BottomSheet;

// eslint-disable-next-line no-restricted-imports
export * from '@gorhom/bottom-sheet';
