// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {EthereumBookIcon} from '@svg/EthereumBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ConfirmAddressButton = ({onPress, style}: Props) => {
  return (
    <PrimaryButton
      icon={<EthereumBookIcon color={COLORS.white} />}
      text={t('button.confirm_address')}
      onPress={onPress}
      style={[styles.button, style]}
      textStyle={styles.buttonTextStyle}
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
