// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {NextArrowIcon} from '@svg/NextArrowIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  text?: string;
};

export const NextButton = ({style, onPress, text}: Props) => {
  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text || t('button.next_step')}</Text>
      <NextArrowIcon style={styles.arrow} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: rem(12),
    paddingHorizontal: rem(32),
  },
  text: {
    ...font(17, 22, 'bold'),
  },
  arrow: {
    marginLeft: rem(12),
  },
});
