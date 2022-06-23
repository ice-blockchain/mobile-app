// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Path, Svg} from 'react-native-svg';

export const LogoIconSvg = ({color = '#1B47C3', width = 18, height = 18}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 23" fill="none">
      <Path
        d="M11.5 0L10.4248 7.17459L11.5 10.7777L12.5752 7.17459L11.5 0Z"
        fill={color}
      />
      <Path
        d="M11.5 23L12.5752 15.8254L11.5 12.2223L10.4248 15.8254L11.5 23Z"
        fill={color}
      />
      <Path
        d="M23 11.5L15.8254 10.4248L12.2223 11.5L15.8254 12.5752L23 11.5Z"
        fill={color}
      />
      <Path
        d="M0 11.5L7.17459 12.5752L10.7777 11.5L7.17459 10.4248L0 11.5Z"
        fill={color}
      />
      <Path
        d="M19.5823 3.31885L13.7751 7.66714L12.0078 10.9861L15.3049 9.17846L19.5823 3.31885Z"
        fill={color}
      />
      <Path
        d="M3.41772 19.6812L9.22488 15.3329L10.9922 12.0139L7.69507 13.8215L3.41772 19.6812Z"
        fill={color}
      />
      <Path
        d="M19.6804 19.582L15.3321 13.7749L12.0132 12.0075L13.8208 15.3047L19.6804 19.582Z"
        fill={color}
      />
      <Path
        d="M3.31958 3.41797L7.66788 9.22513L10.9868 10.9925L9.17919 7.69532L3.31958 3.41797Z"
        fill={color}
      />
    </Svg>
  );
};
