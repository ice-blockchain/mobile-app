// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {rem} from 'rn-units';

export const PADDING_HORIZONTAL = rem(52);
export const FACE_CONTAINER_PADDING_TOP = rem(120);
export const FACE_CONTAINER_WIDTH = windowWidth - PADDING_HORIZONTAL * 2;
export const FACE_CONTAINER_ASPECT_RATIO = 270 / 340;

export function FaceAuthOverlay() {
  const ovalPath = `
        M${PADDING_HORIZONTAL},${
    FACE_CONTAINER_PADDING_TOP +
    (FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO
  }
        a${(FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO},${
    FACE_CONTAINER_WIDTH / 2
  } 0 1,0 ${FACE_CONTAINER_WIDTH},0
        a${(FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO},${
    FACE_CONTAINER_WIDTH / 2
  } 0 1,0 -${FACE_CONTAINER_WIDTH},0
    `;
  return (
    <View style={commonStyles.flexOne}>
      <Svg height="100%" width="100%">
        <Defs>
          <ClipPath id="clip">
            <Rect
              width="100%"
              height="100%"
              fill={COLORS.primaryLight05opacity}
            />
            <Path d={ovalPath} />
          </ClipPath>
        </Defs>

        <G clipPath="url(#clip)">
          <Rect
            width="100%"
            height="100%"
            fill={COLORS.primaryLight05opacity}
          />
        </G>
        <Path
          d={ovalPath}
          fill="none"
          stroke="white"
          opacity="0.5"
          strokeWidth="1"
          strokeDasharray="12,8" // This specifies a pattern with dashes of length 10 and gaps of length 10
        />
      </Svg>
    </View>
  );
}
