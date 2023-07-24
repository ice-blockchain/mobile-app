// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {useDetectBarcode} from '@screens/Modals/QRCodeScanner/hooks/useDetectBarcode';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Camera, CameraType} from 'expo-camera';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export type QRCodeScannerParams = {
  onDetect: (content: string) => void;
};

export const QRCodeScanner = () => {
  const route = useRoute<RouteProp<WelcomeStackParamList, 'QRCodeScanner'>>();
  const navigation = useNavigation();
  const {onDetect} = route.params;

  const {permissionsGranted} = useCameraPermissions();

  const {onBarCodeScanned} = useDetectBarcode({
    onDetect: content => {
      onDetect(content);
      navigation.goBack();
    },
  });

  return (
    <View style={commonStyles.flexOne}>
      <Header backgroundColor="transparent" color={COLORS.white} />
      {permissionsGranted ? (
        <Camera
          style={StyleSheet.absoluteFill}
          type={CameraType.back}
          barCodeScannerSettings={barCodeScannerSettings}
          onBarCodeScanned={onBarCodeScanned}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.stub]} />
      )}
    </View>
  );
};

const barCodeScannerSettings = {
  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
};

const styles = StyleSheet.create({
  stub: {
    backgroundColor: COLORS.black,
  },
});
