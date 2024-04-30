// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: React.ReactNode;
  active: boolean;
  headerText: string;
};
export function TeamSectionSegmentHeader({icon, active, headerText}: Props) {
  const isEnglishLocale = useIsEnglishLocale();
  return (
    <View style={styles.row}>
      {icon}
      <Text
        numberOfLines={2}
        style={[
          styles.text,
          !isEnglishLocale ? styles.smallFont : null,
          {color: active ? COLORS.white : COLORS.secondary},
        ]}>
        {headerText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(6),
  },
  text: {
    maxWidth: '80%',
    ...font(17, 22, 'semibold', 'secondary', 'center'),
    marginLeft: rem(4),
  },
  smallFont: {
    ...font(13, 18, 'semibold', 'secondary', 'center'),
  },
});
