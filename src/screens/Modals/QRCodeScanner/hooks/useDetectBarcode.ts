// SPDX-License-Identifier: ice License 1.0

import {useRef} from 'react';

export const useDetectBarcode = ({
  onDetect,
}: {
  onDetect: (content: string) => void;
}) => {
  const detectedRef = useRef(false);

  const onBarCodeScanned = ({data}: {data: string}) => {
    if (data.length > 0 && !detectedRef.current) {
      detectedRef.current = true;
      onDetect(data ?? '');
    }
  };

  return {onBarCodeScanned};
};
