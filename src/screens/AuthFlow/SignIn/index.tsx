// SPDX-License-Identifier: BUSL-1.1

import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem, font} from 'rn-units';

import LogoSvg from '@svg/logo';
import EmailSvg from '@svg/emailIcon';
import PhoneSvg from '@svg/phoneIcon';
import CommonInput from '@components/CommonInput';
import PrimaryButton from '@components/PrimaryButton';
import BorderedButton from '@components/BorderedButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import MagicIconSvg from '@svg/magicIcon';
import {translate} from '@utils/i18n';

import SocialSignIn, {ESocialType} from './components/socialSignIn';
import {loginUser} from '@services/magicLink';

const SignIn = () => {
  const [email, onChangeEmail] = useState('');

  const onSignIn = () => {
    loginUser(email);
  };
  const onPhonePress = () => {};
  const onSocialSignInPress = (type: ESocialType) => {
    switch (type) {
      case ESocialType.apple:
        break;
      case ESocialType.facebook:
        break;
      case ESocialType.google:
        break;
      case ESocialType.twitter:
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.logo}>
        <LogoSvg />
      </View>

      <View>
        <Text style={styles.title}>
          {true ? translate('signIn.welcome') : translate('signIn.welcomeBack')}
        </Text>
      </View>

      <View>
        <CommonInput
          icon={<EmailSvg />}
          onChangeText={onChangeEmail}
          value={email}
          placeholder={translate('signIn.emailAddress')}
          placeholderColor={COLORS.greyBorder}
          containerStyle={styles.input}
        />

        <PrimaryButton
          onPress={onSignIn}
          text={translate('signIn.logInSignUp')}
        />

        <Text style={styles.text}>or</Text>

        <BorderedButton
          icon={<PhoneSvg />}
          onPress={onPhonePress}
          text={translate('signIn.phone')}
        />

        <SocialSignIn onPress={onSocialSignInPress} />

        <View style={styles.securedBy}>
          <Text style={styles.securedByText}>
            {translate('signIn.securedBy')}
          </Text>
          <MagicIconSvg />
        </View>
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
  input: {
    marginBottom: rem(21),
  },
  logo: {
    marginBottom: rem(59),
    marginTop: rem(111),
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
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  securedBy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rem(153),
  },
  securedByText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(13),
    lineHeight: rem(16),
    color: '#B6B4BA',
  },
});

export default SignIn;
