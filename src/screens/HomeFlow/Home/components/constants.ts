// SPDX-License-Identifier: ice License 1.0

import {StyleSheet} from 'react-native';

/*
  This distance is used to overlap HeaderTopImage component which renders an image.
  And that image is flickering on borders during pull to refresh.
  So to hide those flickering borders we overlap that Image by top and bottom Views.
*/
export const DISTANCE_TO_OVERLAP = StyleSheet.hairlineWidth;
