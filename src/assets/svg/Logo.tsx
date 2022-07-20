// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Circle, Path, Svg, SvgProps} from 'react-native-svg';

export const LogoSvg = (props: SvgProps) => {
  return (
    <Svg width="74" height="74" viewBox="0 0 74 74" {...props} fill="none">
      <Circle cx="37" cy="37" r="37" fill="#1B47C3" />
      <Path
        d="M37 13L34.7561 27.973L37 35.4927L39.2439 27.973L37 13Z"
        fill="white"
      />
      <Path
        d="M37 61L39.2439 46.027L37 38.5073L34.7561 46.027L37 61Z"
        fill="white"
      />
      <Path
        d="M61 37L46.027 34.7561L38.5073 37L46.027 39.2439L61 37Z"
        fill="white"
      />
      <Path
        d="M13 37L27.973 39.2439L35.4927 37L27.973 34.7561L13 37Z"
        fill="white"
      />
      <Path
        d="M53.8689 19.9268L41.7496 29.0015L38.0612 35.9279L44.9423 32.1555L53.8689 19.9268Z"
        fill="white"
      />
      <Path
        d="M20.1311 54.0732L32.2504 44.9985L35.9388 38.0721L29.0577 41.8445L20.1311 54.0732Z"
        fill="white"
      />
      <Path
        d="M54.0728 53.8672L44.998 41.7479L38.0716 38.0595L41.844 44.9405L54.0728 53.8672Z"
        fill="white"
      />
      <Path
        d="M19.9272 20.1328L29.002 32.2521L35.9284 35.9405L32.156 29.0595L19.9272 20.1328Z"
        fill="white"
      />
    </Svg>
  );
};
