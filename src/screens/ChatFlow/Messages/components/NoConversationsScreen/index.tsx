// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {HIT_SLOP} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NewConversationIcon} from '@svg/NewConversationIcon';
import {NoConversationsFoundIcon} from '@svg/NoConversationsFoundIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  searchValue: string;
};

export function NoConversationsScreen({searchValue}: Props) {
  const noFound = !!searchValue;
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.container}>
      {noFound ? <NoConversationsFoundIcon /> : <NewConversationIcon />}
      <Text style={styles.note}>
        {noFound
          ? t('chat.messages.no_conversations_found')
          : t('chat.messages.no_conversations')}
      </Text>
      {noFound ? null : (
        <Pressable
          hitSlop={HIT_SLOP}
          onPress={() => {
            navigation.navigate('NewChatSelector');
          }}>
          <Text style={styles.actionText}>
            {t('chat.messages.new_message')}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  note: {
    paddingTop: rem(16),
    paddingBottom: rem(24),
    ...font(14, 17, 'semibold', 'secondary'),
  },
  actionText: {
    ...font(17, 20, 'semibold', 'primaryLight'),
  },
});
