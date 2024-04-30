// SPDX-License-Identifier: ice License 1.0

import {SCREEN_SIDE_OFFSET, smallHeightDevice} from '@constants/styles';
import {Images} from '@images';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  codeSource: string;
  CodeInput: ReactNode;
  ResendButton: ReactNode;
  BackButton: ReactNode;
  DoThisLaterButton?: ReactNode;
};

export const ConfirmCode = memo(
  ({
    codeSource,
    CodeInput,
    ResendButton,
    BackButton,
    DoThisLaterButton,
  }: Props) => {
    return (
      <View style={styles.container}>
        <Image
          source={Images.phone.confirmPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{t('confirm_code.title')}</Text>
        <Text style={styles.codeSourceDescText}>
          {t('confirm_code.description')}
        </Text>
        <Text style={styles.codeSourceText}>{codeSource}</Text>
        <View style={styles.codeInput}>{CodeInput}</View>
        <View style={styles.resendButton}>{ResendButton}</View>
        <View style={styles.backButton}>{BackButton}</View>
        {DoThisLaterButton ? (
          <View style={styles.backButton}>{DoThisLaterButton}</View>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: rem(10),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  image: {
    alignSelf: 'center',
    height: smallHeightDevice ? rem(80) : rem(140),
  },
  title: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, 30, 'black', 'primaryDark', 'center'),
  },
  codeSourceDescText: {
    marginTop: rem(10),
    ...font(16, 26, 'medium', 'secondary', 'center'),
  },
  codeSourceText: {
    ...font(16, 26, 'bold', 'gunmetalGrey', 'center'),
  },
  codeInput: {
    marginTop: rem(30),
    marginHorizontal: rem(6),
  },
  resendButton: {
    paddingTop: rem(10),
  },
  backButton: {
    marginTop: rem(36),
  },
});
