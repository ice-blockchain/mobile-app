// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
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
  emotionsAuthSessionExpiredAtSelector,
  emotionsAuthSessionSelector,
  emotionsAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {isEmotionsAuthFinalised} from '@store/modules/FaceRecognition/utils';
import {t} from '@translations/i18n';
import {getVideoDimensionsWithFFmpeg} from '@utils/ffmpeg';
import {Duration} from 'dayjs/plugin/duration';
import {Camera, VideoQuality} from 'expo-camera';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
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
const WAIT_BEFORE_RECORDING_MS = 1000;

export function GatherEmotionsStep({
  onAllEmotionsGathered,
  onStartPressed,
  started,
}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const emotions = useSelector(emotionsAuthEmotionsSelector);
  const session = useSelector(emotionsAuthSessionSelector);
  const sessionExpiredAt = useSelector(emotionsAuthSessionExpiredAtSelector);
  const emotionsAuthNextEmotionIndex = useSelector(
    emotionsAuthNextEmotionIndexSelector,
  );
  const [currentVideoCountdown, setCurrentVideoCountdown] = useState<Duration>(
    dayjs.duration(VIDEO_DURATION_SEC, 'seconds'),
  );
  const emotionsAuthStatus = useSelector(emotionsAuthStatusSelector);

  const dispatch = useDispatch();
  const isSessionExpired = !!sessionExpiredAt && Date.now() > sessionExpiredAt;

  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [isAllRecorded, setIsAllRecorded] = useState(false);
  const [recordingEmotion, setRecordingEmotion] = useState<null | AuthEmotion>(
    null,
  );

  useEffect(() => {
    if (isAllRecorded && !isVideoRecording) {
      onAllEmotionsGathered();
    }
  }, [isAllRecorded, isVideoRecording, onAllEmotionsGathered]);

  useEffect(() => {
    if (
      started &&
      !isSessionExpired &&
      !!session &&
      !!emotions[emotionsAuthNextEmotionIndex] &&
      isCameraReady &&
      cameraRef.current
    ) {
      let toAbort = false;
      const recordVideo = async () => {
        if (cameraRef.current) {
          setRecordingEmotion(emotions[emotionsAuthNextEmotionIndex]);
          setCurrentVideoCountdown(
            dayjs.duration(VIDEO_DURATION_SEC, 'seconds'),
          );

          await wait(WAIT_BEFORE_RECORDING_MS);
          if (toAbort) {
            return;
          }

          const recordingStartTime = Date.now();
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
          setIsVideoRecording(true);
          const video = await cameraRef.current
            .recordAsync({
              maxDuration: 5,
              quality: VideoQuality['480p'],
              mute: true,
            })
            .catch(() => {
              toAbort = true;
              return {uri: ''};
            })
            .finally(() => {
              setIsVideoRecording(false);
              clearInterval(handle);
            });
          if (toAbort) {
            return;
          }
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

      return () => {
        toAbort = true;
      };
    }
  }, [
    dispatch,
    emotions,
    emotionsAuthNextEmotionIndex,
    session,
    isCameraReady,
    isSessionExpired,
    started,
  ]);

  useEffect(() => {
    if (
      (emotions.length &&
        emotionsAuthNextEmotionIndex >= emotions.length &&
        emotionsAuthStatus !== 'NEED_MORE_EMOTIONS' &&
        !isSessionExpired) ||
      isEmotionsAuthFinalised(emotionsAuthStatus)
    ) {
      setIsAllRecorded(true);
    }
  }, [
    emotions,
    emotionsAuthNextEmotionIndex,
    emotionsAuthStatus,
    isSessionExpired,
  ]);

  useEffect(() => {
    if (
      (!session && !isEmotionsAuthFinalised(emotionsAuthStatus)) ||
      isSessionExpired ||
      (emotions.length &&
        emotionsAuthNextEmotionIndex >= emotions.length &&
        emotionsAuthStatus === 'NEED_MORE_EMOTIONS')
    ) {
      dispatch(FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.create());
    }
  }, [
    dispatch,
    emotions.length,
    emotionsAuthNextEmotionIndex,
    emotionsAuthStatus,
    isSessionExpired,
    session,
  ]);

  const onGoBack = useCallback(() => {
    if (isVideoRecording && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  }, [isVideoRecording]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onGoBack();
        return false;
      },
    );
    return () => backHandler.remove();
  }, [onGoBack]);

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('face_auth.header')}
        backgroundColor={'transparent'}
        onGoBack={onGoBack}
      />
      <View style={cameraStyles.cameraContainer}>
        <CameraFeed
          ref={cameraRef}
          onCameraReady={() => {
            setIsCameraReady(true);
          }}
        />
        <View style={styles.bottomContainer}>
          {!started || !recordingEmotion ? (
            <StartButton onPress={onStartPressed} />
          ) : (
            <EmotionCard
              emotion={recordingEmotion}
              countDownSecs={currentVideoCountdown}
              previewTimeInMs={WAIT_BEFORE_RECORDING_MS}
            />
          )}
        </View>
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
