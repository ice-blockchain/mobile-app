// SPDX-License-Identifier: ice License 1.0

import BottomSheet from '@components/BottomSheet';
import {commonStyles} from '@constants/styles';
import {useSafeAreaFrame} from '@hooks/useSafeAreaFrame';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {CARD_BODY_TOP_OFFSET} from '@screens/HomeFlow/BalanceHistory/components/CardBody';
import {
  PAGER_HEADER_BUMP_HEIGHT,
  PAGER_HEADER_HEIGHT,
} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader';
import React, {ReactNode, useMemo} from 'react';

type Props = {
  children: ReactNode;
};

export const DynamicHeight = ({children}: Props) => {
  const {top: topInset} = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const positions = useMemo(() => {
    return {
      expanded: frame.height - topInset - HEADER_HEIGHT,
      collapsed:
        frame.height -
        topInset -
        HEADER_HEIGHT -
        PAGER_HEADER_HEIGHT / 2 -
        PAGER_HEADER_BUMP_HEIGHT -
        CARD_BODY_TOP_OFFSET,
    };
  }, [frame.height, topInset]);

  const snapPoints = useMemo(
    () => [positions.collapsed, positions.expanded],
    [positions],
  );

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleComponent={null}
      handleHeight={0}
      animateOnMount={false}
      enableOverDrag={false}
      backgroundStyle={commonStyles.baseSubScreen}>
      {children}
    </BottomSheet>
  );
};
