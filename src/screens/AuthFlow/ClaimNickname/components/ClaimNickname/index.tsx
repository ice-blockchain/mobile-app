// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {font, rem} from 'rn-units';

import ClaimNicknameSvg from '@svg/claimNickname';
import {translate} from '@utils/i18n';
import {FONTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
import CommonInput from '@components/CommonInput';
import ManIconSvg from '@svg/manIcon';

interface ClaimNickNameProps {
  inputValue: string;
  onInputChange: (v: string) => void;
  errorText?: string;
}
const ClaimNickName = ({
  inputValue,
  onInputChange,
  errorText,
}: ClaimNickNameProps) => {
  return (
    <View style={styles.container}>
      <ClaimNicknameSvg width={rem(258)} height={rem(291)} />

      <Text style={styles.title}>{translate('claimNickname.title')}</Text>
      <Text style={styles.description}>
        {translate('claimNickname.description')}
      </Text>

      <CommonInput
        placeholder={translate('claimNickname.inputPlaceholder')}
        value={inputValue}
        onChangeText={onInputChange}
        icon={<ManIconSvg />}
        containerStyle={styles.input}
        errorText={errorText}
      />
    </View>
  );
};

export default ClaimNickName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: rem(100),
  },
  title: {
    marginTop: rem(24),
    marginBottom: rem(11),
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(28),
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    fontSize: font(14),
    lineHeight: rem(24),
    textAlign: 'center',
  },
  input: {
    marginTop: rem(30),
  },
});
