// SPDX-License-Identifier: ice License 1.0

import {windowWidth} from '@constants/styles';
import {StyleSheet} from 'react-native';
import {isIOS} from 'rn-units';

const cameraRatio = [4, 3];

export const useCameraRatio = () => {
  return {
    cameraRatio: cameraRatio.join(':'),
    /**
     * On Android Camera component size should correspond to the ratio
     */
    cameraRatioStyle: isIOS ? StyleSheet.absoluteFill : style.ratio,
  };
};

const style = StyleSheet.create({
  ratio: {
    width: windowWidth,
    height: (windowWidth * cameraRatio[0]) / cameraRatio[1],
    position: 'absolute',
  },
});
