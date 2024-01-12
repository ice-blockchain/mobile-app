// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {COLORS} from '@constants/colors';
import {VIDEO_DURATION_SEC, VIDEO_QUALITY} from '@constants/faceRecognition';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {CameraFeed} from '@screens/FaceRecognitionFlow/components/CameraFeed/CameraFeed';
import {DeviceAngleWarning} from '@screens/FaceRecognitionFlow/components/DeviceAngleWarning';
import {isSmallDevice} from '@screens/FaceRecognitionFlow/constants';
import {EmotionCard} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/EmotionCard';
import {StartButton} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/components/StartButton';
import {useGetVideoDimensions} from '@screens/FaceRecognitionFlow/EmotionsAuthCameraFeed/components/GatherEmotionsStep/hooks/useGetVideoDimensions';
import {useIsDeviceAngleAllowed} from '@screens/FaceRecognitionFlow/hooks/useIsDeviceAngleAllowed';
import {useMaxHeightStyle} from '@screens/FaceRecognitionFlow/hooks/useMaxHeightStyle';
import {dayjs} from '@services/dayjs';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {
  emotionsAuthEmotionsSelector,
  emotionsAuthNextEmotionIndexSelector,
  emotionsAuthSessionSelector,
  emotionsAuthStatusSelector,
} from '@store/modules/FaceRecognition/selectors';
import {isEmotionsAuthFinalised} from '@store/modules/FaceRecognition/utils';
import {t} from '@translations/i18n';
import {Duration} from 'dayjs/plugin/duration';
import {Camera} from 'expo-camera';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem, wait} from 'rn-units';

type Props = {
  onAllEmotionsGathered: () => void;
  onStartPressed: () => void;
  started: boolean;
  isPhoneMigrationFlow: boolean;
};

function getSecondsPassed(since: number) {
  const msPassed = Date.now() - since;
  return Math.floor(msPassed / 1000);
}

// Needed for the Camera component.
// If to start recording a new video right after previous one is stopped recording there camera feed behaves wierd on ios
const WAIT_BEFORE_RECORDING_MS = 100;

export function GatherEmotionsStep({
  onAllEmotionsGathered,
  onStartPressed,
  started,
  isPhoneMigrationFlow,
}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isDeviceAngleAllowed = useIsDeviceAngleAllowed(isCameraReady);
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

  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [isAllRecorded, setIsAllRecorded] = useState(false);
  const [recordingEmotion, setRecordingEmotion] = useState<null | AuthEmotion>(
    null,
  );

  const getVideoDimensions = useGetVideoDimensions();

  useEffect(() => {
    if (isAllRecorded && !isVideoRecording && started) {
      onAllEmotionsGathered();
    }
  }, [isAllRecorded, isVideoRecording, onAllEmotionsGathered, started]);

  useEffect(() => {
    if (
      started &&
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
          if (toAbort || !cameraRef.current) {
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
              quality: VIDEO_QUALITY,
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
          const {width, height} = await getVideoDimensions(video.uri);
          if (toAbort) {
            return;
          }
          dispatch(
            FaceRecognitionActions.EMOTIONS_AUTH.START.create({
              videoUri: video.uri,
              videoWidth: width,
              videoHeight: height,
              isPhoneMigrationFlow,
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
    started,
    getVideoDimensions,
    isPhoneMigrationFlow,
  ]);

  useEffect(() => {
    if (
      (emotions.length &&
        emotionsAuthNextEmotionIndex >= emotions.length &&
        emotionsAuthStatus !== 'NEED_MORE_EMOTIONS') ||
      isEmotionsAuthFinalised(emotionsAuthStatus)
    ) {
      setIsAllRecorded(true);
    }
  }, [emotions, emotionsAuthNextEmotionIndex, emotionsAuthStatus]);

  useEffect(() => {
    if (
      (!session && !isEmotionsAuthFinalised(emotionsAuthStatus)) ||
      (emotions.length &&
        emotionsAuthNextEmotionIndex >= emotions.length &&
        emotionsAuthStatus === 'NEED_MORE_EMOTIONS')
    ) {
      dispatch(
        FaceRecognitionActions.FETCH_EMOTIONS_FOR_AUTH.START.create(
          isPhoneMigrationFlow,
        ),
      );
    }
  }, [
    dispatch,
    emotions.length,
    emotionsAuthNextEmotionIndex,
    emotionsAuthStatus,
    session,
    isPhoneMigrationFlow,
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

  const maxHeightStyle = useMaxHeightStyle();
  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={
          isPhoneMigrationFlow
            ? t('account_confirmation.title')
            : t('face_auth.header')
        }
        backgroundColor={'transparent'}
        onGoBack={onGoBack}
      />
      <View style={[commonStyles.flexOne, maxHeightStyle.maxHeight]}>
        <View style={StyleSheet.absoluteFill}>
          <CameraFeed
            ref={cameraRef}
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
          />
        </View>
        {isCameraReady ? (
          <>
            <View style={styles.bottomContainer}>
              {started && recordingEmotion ? (
                <EmotionCard
                  emotion={recordingEmotion}
                  countDownSecs={currentVideoCountdown}
                  previewTimeInMs={WAIT_BEFORE_RECORDING_MS}
                />
              ) : (
                <StartButton
                  loading={started && !recordingEmotion}
                  onPress={onStartPressed}
                />
              )}
            </View>
            {!isDeviceAngleAllowed && (
              <DeviceAngleWarning
                containerStyle={styles.bottomContainer}
                countDownSecs={
                  started && recordingEmotion ? currentVideoCountdown : null
                }
              />
            )}
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: isSmallDevice ? rem(20) : rem(38),
    left: rem(16),
    right: rem(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
