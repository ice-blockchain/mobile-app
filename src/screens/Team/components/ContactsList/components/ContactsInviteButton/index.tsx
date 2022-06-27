// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {font} from 'rn-units';

type ContactsInviteButtonProps = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
  isActive?: boolean;
};

export const ContactsInviteButton = ({
  icon,
  text,
  onPress,
  isActive,
}: ContactsInviteButtonProps) => {
  return (
    <TouchableOpacity
      style={isActive ? styles.disabledButton : styles.button}
      onPress={onPress}>
      {icon}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 2,
  },
  buttonText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
  disabledButton: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.cadetBlue,
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
});
