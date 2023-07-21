// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {WelcomeStackParamList} from '@navigation/Welcome';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useCameraPermissions} from '@screens/Modals/QRCodeScanner/hooks/useCameraPermissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Camera, CameraType} from 'expo-camera';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export type QRCodeScannerParams = {
  onDetect: (content: string) => void;
};

export const QRCodeScanner = () => {
  const route = useRoute<RouteProp<WelcomeStackParamList, 'QRCodeScanner'>>();
  // const navigation = useNavigation();
  const {onDetect} = route.params;

  const {permissionsGranted} = useCameraPermissions();

  return (
    <View style={commonStyles.flexOne}>
      <Header backgroundColor="transparent" color={COLORS.white} />
      {permissionsGranted ? (
        <Camera
          style={StyleSheet.absoluteFill}
          type={CameraType.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={(...d) => {
            console.log(d);
            onDetect('');
          }}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.stub]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stub: {
    backgroundColor: COLORS.black,
  },
});
