// SPDX-License-Identifier: BUSL-1.1

import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = (widthPercent: string) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const smallScreen = widthPercentageToDP('100%') <= 375;
const adoptToSmallHeight = (value: number) => {
  return smallScreen ? value * 0.8 : value;
};

export {adoptToSmallHeight, widthPercentageToDP};
