// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  segment: {
    text?: string;
    renderText?: (active: boolean) => ReactNode;
    key: string;
  };
  active: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Segment = ({segment, active, style, onPress}: Props) => {
  const isEnglishLocale = useIsEnglishLocale();
  return (
    <Touchable
      key={segment.key}
      onPress={onPress}
      style={[styles.segment, style]}>
      {typeof segment.renderText === 'function' ? (
        segment.renderText(active)
      ) : (
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              !isEnglishLocale ? styles.smallFont : null,
              active ? styles.activeText : styles.inactiveText,
            ]}
            numberOfLines={2}>
            {segment.text ?? ''}
          </Text>
        </View>
      )}
    </Touchable>
  );
};

export const styles = StyleSheet.create({
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: rem(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...font(17, 22, 'semibold'),
  },
  smallFont: {
    ...font(13, 18, 'semibold'),
  },
  activeText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  inactiveText: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
