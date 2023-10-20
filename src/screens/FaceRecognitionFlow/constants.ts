// SPDX-License-Identifier: ice License 1.0

import {rem, screenHeight} from 'rn-units';

export const isSmallDevice = screenHeight < 750; // to include up to 5 inch devices
export const EMOTION_IMAGE_SIZE = isSmallDevice ? rem(80) : rem(120);
export const TAKE_SELFIE_BUTTON_SIZE = isSmallDevice ? rem(80) : rem(100);
