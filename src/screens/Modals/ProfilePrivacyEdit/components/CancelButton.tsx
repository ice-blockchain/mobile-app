// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style: StyleProp<ViewStyle>;
};

export const CancelButton = ({style}: Props) => {
  const navigation = useNavigation();

  return (
    <Touchable style={[styles.container, style]} onPress={navigation.goBack}>
      <Text style={styles.text}>{t('button.cancel')}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: rem(16),
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'center',
    paddingVertical: rem(12),
    paddingHorizontal: rem(26),
  },
  text: {
    ...font(17, 22, 'bold'),
  },
});
