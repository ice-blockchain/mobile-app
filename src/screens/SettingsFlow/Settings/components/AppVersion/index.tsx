// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {font, rem} from 'rn-units';

export const AppVersion = memo(() => {
  const version = DeviceInfo.getReadableVersion();
  return <Text style={styles.titleText}>Version {version}</Text>;
});

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
    marginTop: rem(42),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
