// SPDX-License-Identifier: ice License 1.0

import {FaceAuthKycNumber} from '@api/tokenomics/types';
import {commonStyles} from '@constants/styles';
import {EmotionsSentStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/EmotionsSentStep';
import {GatherEmotionsStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep';
import {emotionsAuthSessionSelector} from '@store/modules/FaceRecognition/selectors';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

type EmotionsAuthPhase = 'GATHER_EMOTIONS' | 'ALL_SENT';

type Props = {
  kycStep: FaceAuthKycNumber;
};

export function EmotionsAuthCameraFeed({kycStep}: Props) {
  const [phase, setPhase] = useState<EmotionsAuthPhase>('GATHER_EMOTIONS');
  const session = useSelector(emotionsAuthSessionSelector);
  const [showStart, setShowStart] = useState(!session);
  const onAllEmotionsGathered = useCallback(() => {
    setPhase('ALL_SENT');
  }, []);
  const onStartPressed = useCallback(() => {
    setShowStart(false);
  }, []);
  const onGatherMoreEmotions = useCallback(() => {
    setPhase('GATHER_EMOTIONS');
  }, []);

  return (
    <View style={commonStyles.flexOne}>
      {phase === 'GATHER_EMOTIONS' ? (
        <GatherEmotionsStep
          onAllEmotionsGathered={onAllEmotionsGathered}
          onStartPressed={onStartPressed}
          started={!showStart}
        />
      ) : null}
      {phase === 'ALL_SENT' ? (
        <EmotionsSentStep
          onGatherMoreEmotions={onGatherMoreEmotions}
          kycStep={kycStep}
        />
      ) : null}
    </View>
  );
}
