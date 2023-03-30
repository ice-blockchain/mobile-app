// SPDX-License-Identifier: ice License 1.0

import {MiningAnimation} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningAnimation';
import {MiningButtonHandlers} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningButtonHandlers';
import {MiningButtonTooltip} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/components/MiningButtonTooltip';
import {useMiningState} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/hooks/useMiningState';
import {useStackingModal} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton/hooks/useStackingModal';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {hapticFeedback} from '@utils/device';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';

interface Props {
  onPress?(): void;
  onPressCallback?: () => void;
}

export const MiningButton = ({onPress, onPressCallback}: Props) => {
  const userInteractedWithButton = useRef(false);
  const {
    stateConfig,
    miningStateTooltipSeen,
    closeTooltip,
    startMiningSession,
  } = useMiningState();

  const {lottieWrapperRef, showStackingModal} = useStackingModal();

  useEffect(() => {
    if (
      stateConfig.showStackingModalOnTransition &&
      userInteractedWithButton.current
    ) {
      showStackingModal();
    }
    userInteractedWithButton.current = false;
  }, [showStackingModal, stateConfig]);

  const gestureHandler = (gesture: 'onTap' | 'onLongPress') => {
    return async () => {
      if (onPressCallback) {
        onPressCallback();
      }
      if (onPress && gesture === 'onTap') {
        onPress();
        return null;
      }

      userInteractedWithButton.current = true;

      const gestureConfig = stateConfig[gesture];

      if (!gestureConfig) {
        return null;
      }

      if (gestureConfig.showStackingModal) {
        showStackingModal();
        AnalyticsEventLogger.trackTapToMine({tapToMineActionType: 'Info'});
      }

      if (gestureConfig.hapticFeedback) {
        hapticFeedback();
      }

      if (gestureConfig.audioFeedback) {
        const audioFeedback = await gestureConfig.audioFeedback;
        audioFeedback.play();
      }

      if (gestureConfig.startMining) {
        startMiningSession({
          tapToMineActionType:
            gesture === 'onLongPress' ? 'Extended' : 'Default',
        });
      }

      if (!miningStateTooltipSeen) {
        closeTooltip();
      }
    };
  };

  // removeClippedSubviews=false to keep the view and make ref.measure function work
  return (
    <View ref={lottieWrapperRef} removeClippedSubviews={false}>
      {!miningStateTooltipSeen && stateConfig.tooltip && (
        <MiningButtonTooltip
          label={stateConfig.tooltip}
          onClose={closeTooltip}
        />
      )}
      <MiningButtonHandlers
        onTap={gestureHandler('onTap')}
        onLongPress={gestureHandler('onLongPress')}>
        <MiningAnimation source={stateConfig.animation} />
      </MiningButtonHandlers>
    </View>
  );
};
