// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {HIT_SLOP, windowWidth} from '@constants/styles';
import {EMOJI_PER_ROW} from '@screens/modals/EmojiSelector/constants';
import {EmojiData} from '@screens/modals/EmojiSelector/type';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  emojis: EmojiData[];
  onSelected: (emoji: string) => void;
};

export const ROW_HEIGHT = rem(40) + rem(8) * 2;

export function EmojiRow({emojis, onSelected}: Props) {
  if (!emojis.length) {
    return null;
  }
  return (
    <View key={emojis[0].emoji} style={styles.row}>
      {emojis.map(data => (
        <Touchable
          key={data.emoji}
          style={styles.cell}
          hitSlop={HIT_SLOP}
          onPress={() => onSelected(data.emoji)}>
          <Text style={styles.emoji}>{data.emoji}</Text>
        </Touchable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: rem(8),
  },
  cell: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: (windowWidth - rem(8) * 2) / EMOJI_PER_ROW,
  },
  emoji: {
    ...font(28, 40, 'medium'),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
