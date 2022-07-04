// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SaveButton = ({onPress, style}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{t('button.save')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: rem(40),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rem(33),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
  },
  buttonText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    color: COLORS.white,
  },
});
