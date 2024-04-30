// SPDX-License-Identifier: ice License 1.0

import {
  PrimaryButton,
  PrimaryButtonProps,
} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

export interface PopUpButtonProps extends PrimaryButtonProps {
  preset?: 'default' | 'destructive' | 'outlined';
  onCheckboxPress?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const DEFAULT_DIALOG_YES_BUTTON: PopUpButtonProps = {
  text: t('button.yes'),
};

export const DEFAULT_DIALOG_NO_BUTTON: PopUpButtonProps = {
  text: t('button.no_cancel'),
  preset: 'outlined',
};

export const PopUpButton = ({
  preset = 'default',
  style,
  textStyle,
  ...props
}: PopUpButtonProps) => {
  return (
    <PrimaryButton
      {...props}
      customBackground={preset !== 'default'}
      textStyle={[
        styles.labelText,
        preset === 'outlined' && styles.labelTextOutlined,
        textStyle,
      ]}
      style={[
        styles.button,
        preset === 'destructive' && styles.buttonDestructive,
        preset === 'outlined' && styles.buttonOutlined,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: rem(128),
    height: rem(40),
    borderRadius: rem(12),
    paddingHorizontal: rem(18),
    marginHorizontal: rem(8),
    marginVertical: rem(5),
  },
  buttonOutlined: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  buttonDestructive: {
    backgroundColor: COLORS.attention,
  },
  labelText: {
    ...font(14, 19, 'black', 'white', 'center'),
  },
  labelTextOutlined: {
    color: COLORS.secondary,
  },
});
