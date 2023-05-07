// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {focused: boolean; label: string};

export function ChatTabBarLabel({focused, label}: Props) {
  return (
    <Text style={[styles.text, focused && styles.focusedText]}>{label}</Text>
  );
}

export function MessageTabChatTabBarLabel({focused}: {focused: boolean}) {
  return <ChatTabBarLabel label={t('chat.messages.label')} focused={focused} />;
}

export function ExploreTabChatTabBarLabel({focused}: {focused: boolean}) {
  return <ChatTabBarLabel label={t('chat.explore.label')} focused={focused} />;
}

const styles = StyleSheet.create({
  text: {
    ...font(17, 20, 'semibold', 'secondary'),
  },
  focusedText: {
    color: COLORS.primaryDark,
  },
});
