// SPDX-License-Identifier: ice License 1.0

import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';

export type IceLabelProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  iconSize?: number;
  lineHeight?: number;
  iconOffsetY?: number;
  label?: string | null;
  reversed?: boolean;
};

export const IceLabel = memo(
  ({textStyle, label = t('general.ice')}: IceLabelProps) => (
    <Text style={textStyle}>{label} </Text>
  ),
);
