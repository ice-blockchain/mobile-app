// SPDX-License-Identifier: ice License 1.0

import {smallHeightDevice, windowWidth} from '@constants/styles';
import {rem} from 'rn-units/index';

export const CIRCLE_DIAMETER = windowWidth * (smallHeightDevice ? 1 : 1.1);

export const CIRCLE_TO_ELEMENT_OFFSET = rem(10);

export const MAX_CIRCLE_OFFSCREEN_TOP = CIRCLE_DIAMETER * 0.2;
export const MAX_CIRCLE_OFFSCREEN_BOTTOM = CIRCLE_DIAMETER * 0.06;

export const ANIMATION_CONFIG = {duration: 250};

export const ANIMATION_DELAY = 300;
