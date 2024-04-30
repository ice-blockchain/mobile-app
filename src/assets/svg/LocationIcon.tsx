// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const LocationIcon = ({
  color = COLORS.secondary,
  ...props
}: SvgProps) => {
  return (
    <Svg width={24} height={24} fill={'none'} viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 16L12.75 14.4V10.2864C14.0407 9.9288 15 8.6864 15 7.2C15 5.4352 13.6545 4 12 4C10.3455 4 9 5.4352 9 7.2C9 8.6864 9.95925 9.9288 11.25 10.2864V14.4L12 16ZM10.5 7.2C10.5 6.3176 11.1727 5.6 12 5.6C12.8273 5.6 13.5 6.3176 13.5 7.2C13.5 8.0824 12.8273 8.8 12 8.8C11.1727 8.8 10.5 8.0824 10.5 7.2Z"
        fill={color}
      />
      <Path
        d="M15.4136 11.0008L14.9872 12.5178C17.06 13.0812 18.4 14.1647 18.4 15.2789C18.4 16.7676 15.772 18.4263 12 18.4263C8.228 18.4263 5.6 16.7676 5.6 15.2789C5.6 14.1647 6.94 13.0812 9.0136 12.517L8.5872 11C5.7576 11.7695 4 13.4086 4 15.2789C4 17.9259 7.5144 20 12 20C16.4856 20 20 17.9259 20 15.2789C20 13.4086 18.2424 11.7695 15.4136 11.0008V11.0008Z"
        fill={color}
      />
    </Svg>
  );
};
