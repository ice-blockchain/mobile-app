// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDetectBarcode} from '@screens/Modals/QRCodeScanner/hooks/useDetectBarcode';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export type QRCodeScannerParams = {
  onDetect: (content: string) => void;
};

export const QRCodeScanner = () => {
  const route = useRoute<RouteProp<WelcomeStackParamList, 'QRCodeScanner'>>();
  const navigation = useNavigation();
  const {onDetect} = route.params;

  const {frameProcessor} = useDetectBarcode({
    onDetect: content => {
      onDetect(content);
      navigation.goBack();
    },
  });

  const device = useCameraDevices().back;
  if (!device) {
    return null;
  }

  return (
    <View style={commonStyles.flexOne}>
      <Header backgroundColor="transparent" color={COLORS.white} />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </View>
  );
};
