// SPDX-License-Identifier: ice License 1.0

import {UserGreetingMethods} from '@screens/HomeFlow/Home/components/Header/components/UserGreeting';
import {
  TOOLTIP_HEIGHT,
  TOOLTIP_WIDTH,
} from '@screens/HomeFlow/Home/components/Header/components/VerifiedTooltip';
import {useRef, useState} from 'react';
import {ViewStyle} from 'react-native';

export const useVerifiedTooltip = () => {
  const chevronRef = useRef<UserGreetingMethods | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<ViewStyle>({});

  const updateTooltipVisibleState = (isVisible: boolean) => {
    setIsTooltipVisible(isVisible);
  };

  const handleChevronPress = async () => {
    if (!isTooltipVisible) {
      await measureTooltipPosition();
    }
    updateTooltipVisibleState(!isTooltipVisible);
  };

  const measureTooltipPosition = async () => {
    if (chevronRef.current) {
      const result = await chevronRef.current?.measure();
      if (result) {
        const calculatedStyle: ViewStyle = {
          top: result.y + TOOLTIP_HEIGHT + 4,
          left: result.x - TOOLTIP_WIDTH / 2 + result.width / 2 + 2,
        };
        setTooltipStyle(calculatedStyle);
      }
    }
  };

  return {
    chevronRef,
    isTooltipVisible,
    updateTooltipVisibleState,
    handleChevronPress,
    tooltipStyle,
  };
};
