// SPDX-License-Identifier: BUSL-1.1

import {NotificationChannel} from '@api/devices/types';
import {Switch} from '@components/Switch';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  channel: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  onChange: (
    channel: string,
    key: keyof NotificationChannel,
    value: boolean,
  ) => void;
};

export const NotificationRow = memo(
  ({channel, pushEnabled, emailEnabled, onChange}: Props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.labelText} numberOfLines={2}>
          {t(`settings.notifications.channel_${channel.toLowerCase()}`)}
        </Text>
        <View style={[styles.section, styles.section_left]}>
          <Text
            style={styles.switchText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {t('settings.notifications.type_push')}
          </Text>
          <Switch
            value={pushEnabled}
            onValueChange={value => onChange(channel, 'push', value)}
          />
        </View>
        <View style={styles.section}>
          <Text
            style={styles.switchText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {t('settings.notifications.type_email')}
          </Text>
          <Switch
            value={emailEnabled}
            onValueChange={value => onChange(channel, 'email', value)}
          />
        </View>
      </View>
    );
  },
);

export const NotificationRowSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: rem(50),
    paddingHorizontal: rem(28),
    alignItems: 'center',
  },
  labelText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    flex: 2,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: rem(10),
  },
  section_left: {
    justifyContent: 'flex-start',
  },
  switchText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    flex: 1,
    marginRight: rem(10),
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
});
