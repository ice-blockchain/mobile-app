// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {EmotionsSentStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/EmotionsSentStep';
import {FaceDetectionSelect} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/FaceDetectionSelect';
import {GatherEmotionsStep} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep';
import {WaitForEmotion} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/WaitForEmotion';
import {emotionsAuthSessionSelector} from '@store/modules/FaceRecognition/selectors';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

type EmotionsAuthPhase =
  | 'FACE_DETECTION_SELECT'
  | 'GATHER_EMOTIONS'
  | 'WAIT_FOR_EMOTION'
  | 'ALL_SENT';

export function EmotionsAuthCameraFeed() {
  const [phase, setPhase] = useState<EmotionsAuthPhase>(
    'FACE_DETECTION_SELECT',
  );
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
  const onWaitForEmotion = useCallback(() => {
    setPhase('WAIT_FOR_EMOTION');
  }, []);

  const [faceDetectionEnabled, setFaceDetectionEnabled] = useState(false);
  const onFaceDetectionSelected = useCallback((useFaceDetection: boolean) => {
    setPhase('GATHER_EMOTIONS');
    setFaceDetectionEnabled(useFaceDetection);
  }, []);

  return (
    <View style={commonStyles.flexOne}>
      {phase === 'FACE_DETECTION_SELECT' ? (
        <FaceDetectionSelect
          onFaceDetectionSelected={onFaceDetectionSelected}
        />
      ) : null}
      {phase === 'GATHER_EMOTIONS' ? (
        <GatherEmotionsStep
          onAllEmotionsGathered={onAllEmotionsGathered}
          onStartPressed={onStartPressed}
          faceDetectionEnabled={faceDetectionEnabled}
          onWaitForEmotion={onWaitForEmotion}
          started={!showStart}
        />
      ) : null}
      {phase === 'WAIT_FOR_EMOTION' ? (
        <WaitForEmotion onGatherMoreEmotions={onGatherMoreEmotions} />
      ) : null}
      {phase === 'ALL_SENT' ? (
        <EmotionsSentStep onGatherMoreEmotions={onGatherMoreEmotions} />
      ) : null}
    </View>
  );
}
