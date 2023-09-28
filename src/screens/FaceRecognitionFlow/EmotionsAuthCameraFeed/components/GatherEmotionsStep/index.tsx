// SPDX-License-Identifier: ice License 1.0

import {
  CameraFeed,
  cameraStyles,
} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {EmotionCard} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/EmotionCard';
import {StartButton} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/StartButton';
import {getPictureCropStartY} from '@screens/FaceRecognitionFlow/utils';
import {dayjs} from '@services/dayjs';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  emotionsAuthEmotionsSelector,
  emotionsAuthNextEmotionIndexSelector,
  emotionsAuthSessionSelector,
  emotionsAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {isEmotionsAuthFinalised} from '@store/modules/FaceRecognition/utils';
import {getVideoDimensionsWithFFmpeg} from '@utils/ffmpeg';
import {Duration} from 'dayjs/plugin/duration';
import {Camera, VideoQuality} from 'expo-camera';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, wait} from 'rn-units';

type Props = {
  onAllEmotionsGathered: () => void;
  onStartPressed: () => void;
  started: boolean;
};

const VIDEO_DURATION_SEC = 5; // 5 seconds

function getSecondsPassed(since: number) {
  const msPassed = Date.now() - since;
  return Math.floor(msPassed / 1000);
}

// Needed for the Camera component.
// If to start recording a new video right after previous one is stopped recording there camera feed behaves wierd on ios
const WAIT_BEFORE_RECORDING = 1000;

export function GatherEmotionsStep({
  onAllEmotionsGathered,
  onStartPressed,
  started,
}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const emotions = useSelector(emotionsAuthEmotionsSelector);
  const session = useSelector(emotionsAuthSessionSelector);
  const emotionsAuthNextEmotionIndex = useSelector(
    emotionsAuthNextEmotionIndexSelector,
  );
  const [currentVideoCountdown, setCurrentVideoCountdown] = useState<Duration>(
    dayjs.duration(VIDEO_DURATION_SEC, 'seconds'),
  );
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      started &&
      !!emotions[emotionsAuthNextEmotionIndex] &&
      isCameraReady &&
      cameraRef.current
    ) {
      let toAbort = false;
      const recordVideo = async () => {
        if (cameraRef.current) {
          await wait(WAIT_BEFORE_RECORDING);
          const video = await cameraRef.current.recordAsync({
            maxDuration: 5,
            quality: VideoQuality['480p'],
            mute: true,
          });
          // You now have the video object which contains the URI to the video file
          const {width, height} = await getVideoDimensionsWithFFmpeg(video.uri);
          if (toAbort) {
            return;
          }
          dispatch(
            FaceRecognitionActions.EMOTIONS_AUTH.START.create({
              videoUri: video.uri,
              cropStartY: getPictureCropStartY({
                pictureWidth: width,
                pictureHeight: height,
              }),
              videoWidth: width,
            }),
          );
        }
      };
      recordVideo();

      const recordingStartTime = Date.now() + WAIT_BEFORE_RECORDING;
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
      return () => {
        toAbort = true;
        clearInterval(handle);
      };
    }
  }, [
    dispatch,
    emotions,
    emotionsAuthNextEmotionIndex,
    isCameraReady,
    started,
  ]);

  useEffect(() => {
    if (
      (emotions.length &&
        emotionsAuthNextEmotionIndex >= emotions.length &&
        emotionsAuthStatus !== 'NEED_MORE_EMOTIONS') ||
      isEmotionsAuthFinalised(emotionsAuthStatus)
    ) {
      onAllEmotionsGathered();
    }
  }, [
    emotions,
    onAllEmotionsGathered,
    emotionsAuthNextEmotionIndex,
    emotionsAuthStatus,
  ]);

  useEffect(() => {
    if (!session && !isEmotionsAuthFinalised(emotionsAuthStatus)) {
      dispatch(FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.create());
    }
  }, [dispatch, emotionsAuthStatus, session]);

  return (
    <View style={cameraStyles.cameraContainer}>
      <CameraFeed
        ref={cameraRef}
        onCameraReady={() => {
          setIsCameraReady(true);
        }}
      />
      <View style={styles.bottomContainer}>
        {!started || !emotions.length ? (
          <StartButton onPress={onStartPressed} />
        ) : (
          <EmotionCard
            emotion={emotions[emotionsAuthNextEmotionIndex]}
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
