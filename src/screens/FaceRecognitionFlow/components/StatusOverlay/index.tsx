// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {replaceString, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title?: string;
  titleIcon?: React.ReactNode;
  description: string;
  actionText?: string;
  actionColor?: string;
  actionIcon?: React.ReactNode;
  action?: () => void;
  onLightBackground?: boolean;
};

export function StatusOverlay({
  title,
  titleIcon,
  description,
  actionIcon,
  actionText,
  actionColor,
  action,
  onLightBackground,
}: Props) {
  return (
    <View style={styles.statusOverlay}>
      {titleIcon}
      {title ? (
        <Text
          style={[
            styles.statusTitle,
            onLightBackground ? styles.statusTitleOnLightBackground : null,
          ]}>
          {title}
        </Text>
      ) : null}
      <Text
        style={[
          styles.statusDescription,
          onLightBackground ? styles.statusDescriptionOnLightBackground : null,
        ]}>
        {replaceString(description, tagRegex('bold', false), (match, index) => (
          <Text
            key={match + index}
            style={[
              styles.bold,
              onLightBackground
                ? styles.statusDescriptionOnLightBackground
                : null,
            ]}>
            {match}
          </Text>
        ))}
      </Text>
      {actionText ? (
        <View style={styles.statusButtonContainer}>
          <Touchable
            onPress={action}
            style={[
              styles.statusButton,
              actionColor ? {backgroundColor: actionColor} : null,
            ]}>
            {actionIcon}
            <Text style={styles.statusText}>{actionText}</Text>
          </Touchable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  statusOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    paddingHorizontal: rem(54),
    ...font(24, null, 'black', 'white', 'center'),
  },
  statusTitleOnLightBackground: {
    color: COLORS.primaryDark,
  },
  statusDescription: {
    paddingTop: rem(16),
    paddingHorizontal: rem(54),
    ...font(14, 20, 'medium', 'white', 'center'),
  },
  bold: {
    ...font(14, 20, 'bold', 'white', 'center'),
  },
  statusDescriptionOnLightBackground: {
    color: COLORS.secondary,
  },
  statusButtonContainer: {
    position: 'absolute',
    bottom: rem(40),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButton: {
    height: rem(40),
    width: rem(240),
    borderRadius: rem(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  statusText: {
    marginStart: rem(8),
    ...font(14, 20, 'black', 'white', 'center'),
  },
});
