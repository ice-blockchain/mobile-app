// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {COLORS} from '@constants/colors';
import {HIT_SLOP, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {CloseModalIcon} from '@svg/CloseModalIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onChangeText: (text: string) => void;
};

export function ChatSelectorHeader({onChangeText}: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('chat.messages.new_chat')}</Text>
      <Pressable
        hitSlop={HIT_SLOP}
        onPress={navigation.goBack}
        style={styles.closeButton}>
        <CloseModalIcon />
      </Pressable>
      <SearchInput
        onChangeText={onChangeText}
        placeholder={t('chat.messages.search_placeholder')}
        containerStyle={styles.search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_SIDE_OFFSET,
  },
  search: {width: '100%', marginTop: rem(24)},
  text: {
    ...font(16, 19, 'bold', 'primaryDark'),
  },
  closeButton: {
    position: 'absolute',
    right: rem(14),
    top: rem(14),
    backgroundColor: COLORS.wildSand,
    width: rem(24),
    height: rem(24),
    borderRadius: rem(24) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
