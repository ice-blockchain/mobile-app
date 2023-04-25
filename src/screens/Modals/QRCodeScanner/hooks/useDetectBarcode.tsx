// SPDX-License-Identifier: ice License 1.0

import {useRef} from 'react';
import {runOnJS} from 'react-native-reanimated';
import {useFrameProcessor} from 'react-native-vision-camera';
import {Barcode, BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';

export const useDetectBarcode = ({
  onDetect,
}: {
  onDetect: (content: string) => void;
}) => {
  const detectedRef = useRef(false);

  const onBarcodesDetect = (barcodes: Barcode[]) => {
    if (barcodes.length > 0 && !detectedRef.current) {
      detectedRef.current = true;
      onDetect(barcodes[0].rawValue ?? '');
    }
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    runOnJS(onBarcodesDetect)(detectedBarcodes);
  }, []);

  return {frameProcessor};
};
