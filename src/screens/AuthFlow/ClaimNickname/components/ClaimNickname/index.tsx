// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ClaimNicknameSvg} from '@svg/ClaimNickname';
import {ManIconSvg} from '@svg/ManIcon';
import {translate} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem, screenHeight} from 'rn-units';

const h = (screenHeight * 291) / 811;
const w = (h * 258) / 291;

interface ClaimNickNameProps {
  inputValue: string;
  onInputChange: (v: string) => void;
  errorText?: string;
}
export const ClaimNickName = ({
  inputValue,
  onInputChange,
  errorText,
}: ClaimNickNameProps) => {
  return (
    <View style={styles.container}>
      <ClaimNicknameSvg width={w} height={h} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: rem(80),
    paddingBottom: 10,
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
    width: rem(247),
  },
});
