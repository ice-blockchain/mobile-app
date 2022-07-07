// SPDX-License-Identifier: BUSL-1.1

import {Switch} from '@components/Switch';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  pushEnabled: boolean;
  emailEnabled: boolean;
  onPushEnabledChange: (value: boolean) => void;
  onEmailEnabledChange: (value: boolean) => void;
};

export const NotificationRow = memo(
  ({
    label,
    pushEnabled,
    emailEnabled,
    onPushEnabledChange,
    onEmailEnabledChange,
  }: Props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.labelText} numberOfLines={2}>
          {label}
        </Text>
        <View style={[styles.section, styles.section_left]}>
          <Text
            style={styles.switchText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            PUSH
          </Text>
          <Switch value={pushEnabled} onValueChange={onPushEnabledChange} />
        </View>
        <View style={styles.section}>
          <Text
            style={styles.switchText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            EMAIL
          </Text>
          <Switch value={emailEnabled} onValueChange={onEmailEnabledChange} />
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
