// SPDX-License-Identifier: ice License 1.0

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
export const loading = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#0D265E"
      d="m6.647 0 3.027 5.925.115 3.447-1.985-2.82L6.647 0ZM13.353 20l-3.027-5.925-.115-3.447 1.985 2.82L13.353 20ZM0 13.353l5.925-3.027 3.447-.115-2.82 1.985L0 13.353ZM20 6.647l-5.925 3.027-3.447.115 2.82-1.985L20 6.647ZM.586 5.243 6.904 7.33 9.409 9.7l-3.395-.61L.586 5.243ZM19.414 14.757l-6.318-2.088-2.505-2.37 3.395.61 5.428 3.848ZM5.243 19.413l2.088-6.317 2.37-2.505-.61 3.395-3.848 5.427ZM14.757.587l-2.088 6.317-2.37 2.505.61-3.394L14.757.587Z"
    />
  </Svg>
);
