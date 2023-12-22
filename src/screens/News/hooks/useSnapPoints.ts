// SPDX-License-Identifier: ice License 1.0

import {useSafeAreaFrame} from '@hooks/useSafeAreaFrame';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {
  FEATURED_HEADER_COLLAPSED_HEIGHT,
  FEATURED_HEADER_EXPANDED_HEIGHT,
  FEATURED_HEADER_OVERLAP,
} from '@screens/News/components/FeaturedNewsArticle';
import {useMemo} from 'react';

export const useSnapPoints = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  const snapPointsData = useMemo(() => {
    const collapsed =
      frame.height - FEATURED_HEADER_EXPANDED_HEIGHT + FEATURED_HEADER_OVERLAP;

    const expanded =
      frame.height - safeAreaInsets.top - FEATURED_HEADER_COLLAPSED_HEIGHT;

    return {
      points: [collapsed, expanded],
      delta: Math.abs(collapsed - expanded),
    };
  }, [frame.height, safeAreaInsets.top]);

  return {snapPointsData};
};
