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
  disabled?: boolean;
};

export const ContactsInviteButton = ({
  icon,
  text,
  onPress,
  disabled,
}: ContactsInviteButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={disabled ? styles.disabledButton : styles.button}
      activeOpacity={0.4}
      onPress={onPress}>
      {icon}
      <Text style={disabled ? styles.disabledText : styles.buttonText}>
        {text}
      </Text>
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
  disabledButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.cadetBlue,
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
  disabledText: {
    fontSize: font(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.cadetBlue,
    paddingLeft: 3,
    textTransform: 'uppercase',
  },
});
