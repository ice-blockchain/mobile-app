// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {getErrorMessage} from '@utils/errors';
import {Camera, CameraType, VideoQuality} from 'expo-camera';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import React, {memo, useRef, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

type Video = {uri: string; duration: number};
type Frame = {uri: string};

export const Home = memo(() => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [video, setVideo] = useState<Video | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [frameGenerationDuration, setFrameGenerationDuration] = useState<
    number | null
  >(null);

  const onStartRecord = async () => {
    try {
      setIsRecording(true);
      const start = Date.now();
      const result = await cameraRef.current?.recordAsync({
        mute: true,
        quality: VideoQuality['4:3'],
      });
      if (result?.uri) {
        setVideo({uri: result.uri, duration: Date.now() - start});
      }
    } catch (error) {
      Alert.alert('oops', getErrorMessage(error));
    } finally {
      setIsRecording(false);
    }
  };

  const onStopRecord = () => {
    cameraRef.current?.stopRecording();
  };

  const onGenerateImages = async () => {
    try {
      if (video) {
        const start = Date.now();
        setIsGenerating(true);
        setFrameGenerationDuration(null);
        setFrames([]);
        // const numberOfFrames = Math.floor(video.duration / 333) + 1;

        // const session = await FFmpegKit.execute(
        //   `-ss 00:00:01 -i ${video.uri} -frames:v 1 file:///data/user/0/io.ice.app.staging/cache/Camera/foobar4.jpg`,
        // );
        // const session = await FFmpegKit.execute(
        //   `-i ${video.uri} -filter:v \
        //   "select='eq(t\,1.5)'" \
        //   -vsync drop file:///data/user/0/io.ice.app.staging/cache/Camera/foobar_100.png`,
        // );

        const session = await FFmpegKit.execute(
          `-i ${video.uri} -filter:v fps=fps=3 file:///data/user/0/io.ice.app.staging/cache/Camera/foo3.mp4`,
        );

        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          console.log('SUCCESS!!', returnCode);
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('CANCEL!!', returnCode);
        } else {
          console.log('ERROR!!', returnCode);
        }

        setFrameGenerationDuration(Date.now() - start);
        setFrames([]);
      }
    } catch (error) {
      Alert.alert('oops', getErrorMessage(error));
    } finally {
      setIsGenerating(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>No Permissions</Text>
        <PrimaryButton
          text={'Request Permissions'}
          onPress={requestPermission}
        />
      </View>
    );
  }

  console.log(frames);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
        ratio={'4:3'}
      />
      {isRecording ? (
        <PrimaryButton text={'Stop'} onPress={onStopRecord} />
      ) : (
        <PrimaryButton text={'Record'} onPress={onStartRecord} />
      )}
      {!!video && (
        <>
          <Text>Video Uri: {video.uri}</Text>
          <Text>Video duration is: {video.duration}ms</Text>
          <PrimaryButton
            text={'Generate Images'}
            onPress={onGenerateImages}
            disabled={isGenerating}
            loading={isGenerating}
          />
        </>
      )}
      {!!frameGenerationDuration && (
        <>
          <Text>Frame generation duration is: {frameGenerationDuration}ms</Text>
          <Text>Number of frames is: {frames.length}</Text>
        </>
      )}
      {frames.length > 0 && (
        <ScrollView horizontal={true}>
          {frames.map(frame => (
            <Image
              source={{uri: frame.uri}}
              key={frame.uri}
              style={styles.frame}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  camera: {
    width: 300,
    height: 225,
    alignSelf: 'center',
  },
  frameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  frame: {
    width: 200,
    height: 100,
    backgroundColor: 'grey',
  },
});
