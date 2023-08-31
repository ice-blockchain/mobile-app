// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
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
};

export function StatusOverlay({
  title,
  titleIcon,
  description,
  actionIcon,
  actionText,
  actionColor,
  action,
}: Props) {
  return (
    <View style={styles.statusOverlay}>
      {titleIcon}
      {title ? <Text style={styles.statusTitle}>{title}</Text> : null}
      <Text style={styles.statusDescription}>{description}</Text>
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
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryDark09opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    paddingHorizontal: rem(90),
    ...font(24, null, 'black', 'white', 'center'),
  },
  statusDescription: {
    paddingTop: rem(16),
    paddingHorizontal: rem(54),
    ...font(14, 20, 'medium', 'white', 'center'),
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
