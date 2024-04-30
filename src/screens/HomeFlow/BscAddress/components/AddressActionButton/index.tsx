// SPDX-License-Identifier: ice License 1.0

import {
  PrimaryButton,
  PrimaryButtonProps,
} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {BscBookIcon} from '@svg/BscBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

interface Props extends Omit<PrimaryButtonProps, 'text'> {
  style?: StyleProp<ViewStyle>;
  isRemoveAction?: boolean;
}

export const AddressActionButton = ({
  style,
  isRemoveAction,
  ...props
}: Props) => {
  return (
    <PrimaryButton
      icon={<BscBookIcon color={COLORS.white} />}
      text={
        isRemoveAction
          ? t('button.remove_address')
          : t('button.confirm_address')
      }
      style={[styles.button, style]}
      textStyle={styles.buttonTextStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: rem(48),
    marginHorizontal: rem(18),
    height: rem(48),
  },
  buttonTextStyle: {
    ...font(14, 17, 'black'),
  },
});
