// SPDX-License-Identifier: ice License 1.0

import {SEARCH_INPUT_HEIGHT} from '@components/Inputs/SearchInput';
import {rem} from 'rn-units';

export const SEARCH_MARGIN_VERTICAL = rem(12);

export const SEARCH_HIDDEN_Y = -(
  SEARCH_INPUT_HEIGHT +
  SEARCH_MARGIN_VERTICAL * 2 +
  1
);
