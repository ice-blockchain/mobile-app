// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import * as React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
  icon: React.ReactNode;
  action: () => void;
  isDangerous?: boolean;
};

export function ContextMenuAction({title, icon, action, isDangerous}: Props) {
  return (
    <Pressable style={styles.container} onPress={action}>
      <Text
        style={[styles.title, isDangerous ? styles.dangerousActionText : null]}>
        {title}
      </Text>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(16),
    paddingVertical: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...font(14, 20, 'semibold', 'primaryDark'),
    marginRight: rem(50),
  },
  dangerousActionText: {
    color: COLORS.attention,
  },
});
