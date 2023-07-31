// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export const UserListItemButton = ({icon, text, onPress, disabled}: Props) => {
  return (
    <Touchable
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}>
      {icon}
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {text}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: rem(9),
    paddingHorizontal: rem(11),
    paddingVertical: rem(2),
  },
  disabledButton: {
    borderColor: COLORS.cadetBlue,
  },
  buttonText: {
    paddingLeft: !isRTL ? rem(4) : 0,
    paddingRight: isRTL ? rem(4) : 0,
    textTransform: 'uppercase',
    ...font(12, null, 'bold', 'primaryDark'),
  },
  disabledText: {
    color: COLORS.cadetBlue,
  },
});
