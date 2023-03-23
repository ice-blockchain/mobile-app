// SPDX-License-Identifier: ice License 1.0

import {smallHeightDevice} from '@constants/styles';
import {rem, screenWidth} from 'rn-units/index';

export const CIRCLE_DIAMETER = screenWidth * (smallHeightDevice ? 1 : 1.1);

export const CIRCLE_TO_ELEMENT_OFFSET = rem(10);

export const MAX_CIRCLE_OFFSCREEN = CIRCLE_DIAMETER * 0.2;

export const ANIMATION_CONFIG = {duration: 500};

export const ANIMATION_DELAY = 300;
