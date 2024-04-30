// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {
  CIRCLE_DIAMETER,
  CIRCLE_TO_ELEMENT_OFFSET,
  MAX_CIRCLE_OFFSCREEN_BOTTOM,
  MAX_CIRCLE_OFFSCREEN_TOP,
} from '@screens/Walkthrough/constants';
import {useMemo} from 'react';
import {screenHeight} from 'rn-units/index';

type Props = {
  elementHeight?: number;
  elementTop?: number;
  circlePosition?: 'top' | 'bottom';
};

export function useCirclePosition({
  elementHeight,
  elementTop,
  circlePosition,
}: Props) {
  const {top: topInset} = useSafeAreaInsets();
  return useMemo(() => {
    if (elementTop && elementHeight) {
      const aboveSpace = elementTop;
      const belowSpace = screenHeight - elementTop - elementHeight;

      const position =
        circlePosition ?? (aboveSpace > belowSpace ? 'top' : 'bottom');

      if (position === 'top') {
        if (CIRCLE_DIAMETER < aboveSpace) {
          return {
            top:
              aboveSpace -
              CIRCLE_DIAMETER -
              Math.min(CIRCLE_TO_ELEMENT_OFFSET, aboveSpace - CIRCLE_DIAMETER),
          };
        } else {
          return {
            top: Math.max(
              aboveSpace - CIRCLE_DIAMETER - CIRCLE_TO_ELEMENT_OFFSET,
              topInset - MAX_CIRCLE_OFFSCREEN_TOP,
            ),
          };
        }
      } else {
        if (CIRCLE_DIAMETER < belowSpace) {
          return {
            top:
              elementTop +
              elementHeight +
              Math.min(CIRCLE_TO_ELEMENT_OFFSET, belowSpace - CIRCLE_DIAMETER),
          };
        } else {
          return {
            top: Math.min(
              elementTop + elementHeight + CIRCLE_TO_ELEMENT_OFFSET,
              screenHeight - CIRCLE_DIAMETER + MAX_CIRCLE_OFFSCREEN_BOTTOM,
            ),
          };
        }
      }
    }
  }, [elementTop, elementHeight, circlePosition, topInset]);
}
