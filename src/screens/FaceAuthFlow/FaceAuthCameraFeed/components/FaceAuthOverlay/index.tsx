// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {rem} from 'rn-units';

const PADDING_HORIZONTAL = rem(42);
const FACE_CONTAINER_WIDTH = windowWidth - PADDING_HORIZONTAL * 2;
const FACE_CONTAINER_ASPECT_RATIO = 292 / 390;

export function FaceAuthOverlay() {
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
            <Path
              d={`
        M${PADDING_HORIZONTAL},${
                rem(120) +
                (FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO
              }
        a${(FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO},${
                FACE_CONTAINER_WIDTH / 2
              } 0 1,0 ${FACE_CONTAINER_WIDTH},0
        a${(FACE_CONTAINER_WIDTH / 2) * FACE_CONTAINER_ASPECT_RATIO},${
                FACE_CONTAINER_WIDTH / 2
              } 0 1,0 -${FACE_CONTAINER_WIDTH},0
    `}
            />
          </ClipPath>
        </Defs>

        <G clipPath="url(#clip)">
          <Rect
            width="100%"
            height="100%"
            fill={COLORS.primaryLight05opacity}
          />
        </G>
      </Svg>
    </View>
  );
}
