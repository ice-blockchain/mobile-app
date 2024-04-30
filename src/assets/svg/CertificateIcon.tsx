// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CertificateIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 19.5H2V4.5H22V10"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 14.5V13C20 12.6022 19.842 12.2206 19.5607 11.9393C19.2794 11.658 18.8978 11.5 18.5 11.5C18.1022 11.5 17.7206 11.658 17.4393 11.9393C17.158 12.2206 17 12.6022 17 13V14.5M6 8.5H9M6 11.5H12M15 14.5H22V18.5H15V14.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
