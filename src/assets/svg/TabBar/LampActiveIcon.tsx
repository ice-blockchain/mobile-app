// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const LampActiveIcon = () => (
  <Svg width={20} height={26} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.804 18.61c-.23 0-.457.044-.66-.062a.88.88 0 0 1-.429-.506c-.162-.54-.465-1.044-.883-1.591-.22-.285-.447-.564-.682-.837l-.107-.129a35.794 35.794 0 0 1-.651-.781C1.355 13.412.335 11.812.335 9.428.335 4.442 4.338.5 9.712.5c5.374 0 9.377 3.94 9.377 8.93 0 2.382-1.02 3.982-2.058 5.275-.216.27-.44.532-.65.781l-.108.128c-.246.29-.475.564-.682.837-.417.547-.72 1.053-.883 1.59a.879.879 0 0 1-.425.522c-.206.11-.393.056-.67.068l-7.81-.02Zm.977 6.21a.879.879 0 0 1 .88-.878h4.102a.88.88 0 0 1 0 1.758H7.66a.879.879 0 0 1-.88-.88Zm-.879-4.394a.879.879 0 1 0 0 1.758h7.62a.879.879 0 0 0 0-1.758h-7.62Z"
      fill="#1B47C3"
    />
  </Svg>
);
