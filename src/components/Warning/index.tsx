// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoIcon} from '@svg/InfoIcon';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Warning = ({text, containerStyle}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <InfoIcon
        color={COLORS.white}
        secondaryColor={COLORS.attention}
        width={rem(20)}
        height={rem(20)}
      />
      <Text style={styles.warningText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.attention,
    borderRadius: rem(16),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: rem(12),
  },
  warningText: {
    marginVertical: rem(12),
    marginStart: rem(12),
    flex: 1,
    ...font(13, 18, 'medium', 'white'),
  },
});
