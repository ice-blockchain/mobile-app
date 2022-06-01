// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Circle, Svg} from 'react-native-svg';

export const ProgressCircleSvg = ({
  progress = 40,
  radius = 18,
  strokeWidth = 4,
  color = '#35D487',
}) => {
  var c = Math.PI * (radius * 2);
  let val = progress;
  if (isNaN(val)) {
    val = 0;
  }
  if (val < 0) {
    val = 0;
  }
  if (val > 100) {
    val = 100;
  }

  const pct = ((100 - val) / 100) * c;
  const radiusWithStroke = radius + strokeWidth * 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <Svg
      style={{transform: [{rotateZ: '-90deg'}]}}
      width={radiusWithStroke * 2}
      height={radiusWithStroke * 2}
      viewBox={`0 0 ${radiusWithStroke * 2} ${radiusWithStroke * 2}`}>
      <Circle
        r={radius}
        cx={radiusWithStroke}
        cy={radiusWithStroke}
        fill="transparent"
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={pct}
        strokeLinecap={'round'}
      />
    </Svg>
  );
};
