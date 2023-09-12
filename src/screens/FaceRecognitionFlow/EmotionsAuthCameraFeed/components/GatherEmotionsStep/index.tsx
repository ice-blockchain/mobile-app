// SPDX-License-Identifier: ice License 1.0

import {commonStyles} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {EmotionCard} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/EmotionCard';
import {StartButton} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/StartButton';
import {getPictureCropStartY} from '@screens/FaceRecognitionFlow/utils';
import {dayjs} from '@services/dayjs';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {emotionsAuthEmotionsSelector} from '@store/modules/FaceRecognition/selectors';
import {getVideoDimensionsWithFFmpeg} from '@utils/ffmpeg';
import {Duration} from 'dayjs/plugin/duration';
import {Camera, VideoQuality} from 'expo-camera';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onAllEmotionsGathered: () => void;
};

const VIDEO_DURATION_SEC = 5; // 5 seconds

function getSecondsPassed(since: number) {
  const msPassed = Date.now() - since;
  return Math.floor(msPassed / 1000);
}

export function GatherEmotionsStep({onAllEmotionsGathered}: Props) {
  const {top: safeAreaTopOffset} = useSafeAreaInsets();
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const emotions = useSelector(emotionsAuthEmotionsSelector);
  const [showStart, setShowStart] = useState(!emotions.length);
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [currentVideoCountdown, setCurrentVideoCountdown] = useState<Duration>(
    dayjs.duration(VIDEO_DURATION_SEC, 'seconds'),
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!emotions.length) {
      dispatch(FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.create());
    }
  }, [dispatch, emotions.length]);

  useEffect(() => {
    if (
      !showStart &&
      !!emotions[currentEmotionIndex] &&
      isCameraReady &&
      cameraRef.current
    ) {
      const recordVideo = async () => {
        if (cameraRef.current) {
          const video = await cameraRef.current.recordAsync({
            maxDuration: 5,
            quality: VideoQuality['480p'],
            mute: true,
          });
          // You now have the video object which contains the URI to the video file
          const {width, height} = await getVideoDimensionsWithFFmpeg(video.uri);
          console.log({video, width, height});
          getPictureCropStartY({safeAreaTopOffset, pictureWidth: width});
          dispatch(
            FaceRecognitionActions.EMOTIONS_AUTH.START.create({
              videoUri: video.uri,
              cropStartY: getPictureCropStartY({
                safeAreaTopOffset,
                pictureWidth: width,
              }),
              videoWidth: width,
            }),
          );
          setCurrentEmotionIndex(i => i + 1);
        }
      };
      recordVideo();

      const recordingStartTime = Date.now();
      setCurrentVideoCountdown(dayjs.duration(VIDEO_DURATION_SEC, 'seconds'));
      const handle = setInterval(() => {
        setCurrentVideoCountdown(
          dayjs.duration(
            Math.max(
              0,
              VIDEO_DURATION_SEC - getSecondsPassed(recordingStartTime),
            ),
            'seconds',
          ),
        );
      }, 1000);
      return () => clearInterval(handle);
    }
  }, [
    currentEmotionIndex,
    dispatch,
    emotions,
    isCameraReady,
    safeAreaTopOffset,
    showStart,
  ]);

  useEffect(() => {
    if (emotions.length && currentEmotionIndex >= emotions.length) {
      onAllEmotionsGathered();
    }
  }, [emotions, onAllEmotionsGathered, currentEmotionIndex]);

  return (
    <View style={commonStyles.flexOne}>
      <CameraFeed
        ref={cameraRef}
        onCameraReady={() => {
          setIsCameraReady(true);
        }}
      />
      <View style={styles.bottomContainer}>
        {showStart || !emotions.length ? (
          <StartButton onPress={() => setShowStart(false)} />
        ) : (
          <EmotionCard
            emotion={emotions[currentEmotionIndex]}
            countDownSecs={currentVideoCountdown}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: rem(38),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
