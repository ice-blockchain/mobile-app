// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {ShowPrivacyActionButton} from './components/ShowPrivacyActionButton';
import {useProfileWalkthrough} from './hooks/useProfileWalkthrough';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const ShowPrivacyButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props) => {
  const {elementRef, onElementLayout} = useProfileWalkthrough();

  return (
    <View style={containerStyle} ref={elementRef} onLayout={onElementLayout}>
      <ShowPrivacyActionButton color={color} />
    </View>
  );
};
