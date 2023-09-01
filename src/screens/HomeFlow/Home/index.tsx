// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {getErrorMessage} from '@utils/errors';
import {Camera, CameraType, VideoQuality} from 'expo-camera';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import React, {memo, useRef, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

type Video = {uri: string; duration: string};
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
      const result = await cameraRef.current?.recordAsync({
        mute: true,
        quality: VideoQuality['4:3'],
      });

      if (result?.uri) {
        const session = await FFmpegKit.execute(`-i ${result.uri}`);
        const output = await session.getOutput();
        const match = output.match(/Duration: ([^,]+)/);

        setVideo({uri: result.uri, duration: match?.[1] ?? ''});
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
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          },
        );

        // await FFmpegKit.execute(
        //   `-i ${video.uri} -vframes 1 file:///data/user/0/io.ice.app.staging/cache/Camera/${uuid}_000.bmp`,
        // );

        // to resize "-s 240x135"
        const session = await FFmpegKit.execute(
          `-i ${video.uri} -vf fps=3 file:///data/user/0/io.ice.app.staging/cache/Camera/${uuid}_%03d.bmp`,
        );

        const output = await session.getOutput();

        const numberOfFrames = parseInt(
          output
            .match(/frame=(.*?)(\d+)/g)
            ?.pop()
            ?.match(/\d+/)?.[0] ?? '',
          10,
        );

        if (!numberOfFrames || isNaN(numberOfFrames)) {
          throw new Error('Error parsing number of frames');
        }

        setFrameGenerationDuration(Date.now() - start);
        setFrames(
          Array(numberOfFrames)
            .fill(null)
            .map((_, i) => ({
              uri: `file:///data/user/0/io.ice.app.staging/cache/Camera/${uuid}_0${(
                i + 1
              )
                .toString()
                .padStart(2, '0')}.bmp`,
            })),
        );
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
          <Text>Video duration is: {video.duration}</Text>
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
    width: 225,
    height: 300,
    alignSelf: 'center',
  },
  frameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  frame: {
    width: 75,
    height: 100,
    marginHorizontal: 10,
    backgroundColor: 'grey',
  },
});
