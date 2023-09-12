// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {EmotionsSentStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/EmotionsSentStep';
import {GatherEmotionsStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep';
import React, {useState} from 'react';
import {View} from 'react-native';

type EmotionsAuthPhase = 'GATHER_EMOTIONS' | 'ALL_SENT';

export function EmotionsAuthCameraFeed() {
  const [phase, setPhase] = useState<EmotionsAuthPhase>('GATHER_EMOTIONS');

  return (
    <View style={commonStyles.flexOne}>
      {phase === 'GATHER_EMOTIONS' ? (
        <GatherEmotionsStep
          onAllEmotionsGathered={() => setPhase('ALL_SENT')}
        />
      ) : null}
      {phase === 'ALL_SENT' ? <EmotionsSentStep /> : null}
    </View>
  );
}
