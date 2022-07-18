// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {SignUpStackParamList} from '@navigation/Auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BorderedButton} from '@screens/UserRegistrationFlow/SignIn/components/BorderedButton';
import {AuthActions} from '@store/modules/Auth/actions';
import {isAuthorizedSelector} from '@store/modules/Auth/selectors';
import {
  deviceLocationSelector,
  deviceSettingsSelector,
} from '@store/modules/Devices/selectors';
import {EmailIconSvg} from '@svg/EmailIcon';
import {LogoSvg} from '@svg/Logo';
import {MagicIconSvg} from '@svg/MagicIcon';
import {PhoneIconSvg} from '@svg/PhoneIcon';
import {translate} from '@translations/i18n';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {font, isIOS, rem} from 'rn-units';

import {ESocialType, SocialSignIn} from './components/SocialSignIn';

type Props = {
  navigation: NativeStackNavigationProp<SignUpStackParamList, 'SignIn'>;
};

export const SignIn = ({navigation}: Props) => {
  const [email, onChangeEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState(false);

  const dispatch = useDispatch();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const deviceSettings = useSelector(deviceSettingsSelector);
  const location = useSelector(deviceLocationSelector);

  const phoneNumber = `${selectedCountry.iddCode}${phone}`;

  useEffect(() => {
    if (isAuthorized && deviceSettings) {
      navigation.navigate('UserRegistration');
    }
  }, [navigation, isAuthorized, deviceSettings]);

  useEffect(() => {
    if (location) {
      const countries = countriesCode;
      const currentCountry = countries.find(country => {
        return country.isoCode.toLowerCase() === location.country.toLowerCase();
      });
      if (currentCountry) {
        setSelectedCountry(currentCountry);
      }
    }
  }, [location]);

  const onSignIn = async () => {
    Keyboard.dismiss();
    if (inputType === 'email') {
      await dispatch(AuthActions.SIGN_IN_EMAIL.START.create(email));
    } else {
      await dispatch(AuthActions.SIGN_IN_PHONE.START.create(phoneNumber));
    }
  };
  const onPhonePress = () => {
    if (inputType === 'email') {
      setInputType('phone');
    } else {
      setInputType('email');
    }
  };
  const onSocialSignInPress = async (type: ESocialType) => {
    switch (type) {
      case ESocialType.apple:
        await dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('apple'));
        break;
      case ESocialType.facebook:
        await dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('facebook'));
        break;
      case ESocialType.google:
        await dispatch(AuthActions.SIGN_IN_SOCIAL.START.create('google'));
        break;
      case ESocialType.twitter:
        break;
    }
  };

  const showCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(true);
  };
  const hideCountryCodeSearch = useCallback(() => {
    setCountryCodeSearchVisibility(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        style={styles.container}
        testID="signin">
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode={'none'}>
          <View style={styles.logo}>
            <LogoSvg />
          </View>

          <View testID="welcome_title">
            <Text style={styles.title}>{translate('signIn.welcome')}</Text>
          </View>

          <View style={styles.inputContainer}>
            {inputType === 'email' ? (
              <CommonInput
                icon={<EmailIconSvg />}
                onChangeText={onChangeEmail}
                value={email}
                placeholder={translate('signIn.emailAddress')}
                containerStyle={styles.input}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
            ) : (
              <PhoneNumberInput
                selectedCountry={selectedCountry}
                containerStyle={styles.input}
                showCountryCodeSearch={showCountryCodeSearch}
                value={phone}
                onValueChange={setPhone}
              />
            )}

            <PrimaryButton
              onPress={onSignIn}
              text={translate('signIn.logInSignUp')}
            />

            <Text style={styles.text}>or</Text>

            <BorderedButton
              icon={inputType === 'email' ? <PhoneIconSvg /> : <EmailIconSvg />}
              onPress={onPhonePress}
              text={inputType === 'email' ? translate('signIn.phone') : 'Email'}
            />

            <SocialSignIn onPress={onSocialSignInPress} />

            {isCountryCodeSearchVisible ? (
              <PhoneNumberSearch
                containerStyle={styles.phoneNumberSeatch}
                selectedCountry={selectedCountry}
                close={hideCountryCodeSearch}
                setCountryCode={setSelectedCountry}
              />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.securedBy}>
        <Text style={styles.securedByText}>
          {translate('signIn.securedBy')}
        </Text>
        <MagicIconSvg />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginBottom: rem(21),
    width: rem(247),
  },
  logo: {
    marginBottom: rem(59),
    marginTop: rem(50),
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
  },
  securedByText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(13),
    lineHeight: rem(16),
    color: COLORS.greyBorder,
  },
  phoneNumberSeatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
