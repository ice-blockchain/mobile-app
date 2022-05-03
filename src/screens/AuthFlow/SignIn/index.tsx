// SPDX-License-Identifier: BUSL-1.1

import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem, font} from 'rn-units';
import LogoSvg from '@svg/logo';
import EmailSvg from '@svg/emailIcon';
import PhoneSvg from '@svg/phoneIcon';
import AppleSvg from '@svg/appleIcon';
import CommonInput from '@components/CommonInput';
import PrimaryButton from '@components/PrimaryButton';
import BorderedButton from '@components/BorderedButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';

const SignIn = () => {
  const [email, onChangeEmail] = useState('');

  const onSignIn = () => {};
  const onPhonePress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.logo}>
        <LogoSvg />
      </View>

      <View>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View>
        <CommonInput
          icon={<EmailSvg />}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={'Email address'}
          placeholderColor={COLORS.greyBorder}
        />

        <PrimaryButton onPress={onSignIn} text={'Log in / Sign up'} />

        <Text style={styles.text}>or</Text>

        <BorderedButton
          icon={<PhoneSvg />}
          onPress={onPhonePress}
          text={'Phone'}
        />

        <AppleSvg />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: rem(20),
    alignItems: 'center',
  },
  logo: {
    marginBottom: rem(59),
  },
  title: {
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(28),
    lineHeight: rem(33.6),
    marginBottom: rem(42),
  },
  text: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    fontSize: font(10),
    lineHeight: rem(12),
    marginVertical: rem(14),
    alignSelf: 'center',
  },
});

export default SignIn;
