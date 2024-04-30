// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {FaqIcon} from '@svg/FaqIcon';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const FaqButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props = {}) => {
  return (
    <View style={containerStyle}>
      <Touchable
        onPress={() => openLinkWithInAppBrowser({url: LINKS.ICE_FAQ})}
        hitSlop={SMALL_BUTTON_HIT_SLOP}>
        <FaqIcon fill={color} />
      </Touchable>
    </View>
  );
};
