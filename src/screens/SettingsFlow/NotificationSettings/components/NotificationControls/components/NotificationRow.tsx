// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {RoundCheckboxActiveIcon} from '@svg/RoundCheckboxActiveIcon';
import {RoundCheckboxInactiveIcon} from '@svg/RoundCheckboxInactiveIcon';
import {t} from '@translations/i18n';
import {Translations} from '@translations/locales/en.json';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  type: string;
  checked: boolean;
  disabled: boolean;
};

export const NotificationRow = ({onPress, type, checked, disabled}: Props) => {
  const channelTitle =
    `settings.notifications.domain.${type}.title` as keyof Translations;
  const title = t(channelTitle);
  const channelDescription =
    `settings.notifications.domain.${type}.description` as keyof Translations;
  const description = t(channelDescription);
  return (
    <Touchable
      onPress={onPress}
      style={styles.notificationRow}
      disabled={disabled}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {checked ? (
        <RoundCheckboxActiveIcon
          color={!disabled ? COLORS.shamrock : COLORS.periwinkleGray}
        />
      ) : (
        <RoundCheckboxInactiveIcon />
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rem(12),
  },
  info: {maxWidth: '90%'},
  title: {
    ...font(16, 21, 'black', 'primaryDark'),
    paddingBottom: rem(4),
  },
  description: {
    ...font(14, 19, 'medium', 'secondary'),
  },
});
