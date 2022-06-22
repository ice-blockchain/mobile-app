// SPDX-License-Identifier: BUSL-1.1

import {BorderedButton} from '@components/BorderedButton';
import {CommonInput} from '@components/CommonInput';
import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {OAuthRedirectResult} from '@magic-ext/react-native-oauth';
import {SignUpStackParamList} from '@navigation/Auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {magicLink} from '@services/magicLink';
import {AuthActions} from '@store/modules/Auth/actions';
import {RootState} from '@store/rootReducer';
import {EmailIconSvg} from '@svg/EmailIcon';
import {LogoSvg} from '@svg/Logo';
import {MagicIconSvg} from '@svg/MagicIcon';
import {PhoneIconSvg} from '@svg/PhoneIcon';
import {translate} from '@translations/i18n';
import React, {useState} from 'react';
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

import {ESocialType, SocialSignIn} from './components/socialSignIn';

type Props = {
  navigation: NativeStackNavigationProp<SignUpStackParamList, 'SignIn'>;
};

export const SignIn = ({navigation}: Props) => {
  const [email, onChangeEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const usersInfo = useSelector((state: RootState) => state.auth.usersInfo);

  const onSignIn = async () => {
    Keyboard.dismiss();
    if (inputType === 'email') {
      const success = await magicLink.loginUser(email);
      if (success) {
        const emailLowerCase = email.toLowerCase();
        if (!usersInfo[emailLowerCase]?.profileFilled) {
          navigation.navigate('ClaimNickname');
        } else if (!usersInfo[emailLowerCase]?.welcomeSeen) {
          navigation.navigate('Welcome');
        }
        dispatch(
          AuthActions.STORE_USER_DATA.STATE.create({
            email: emailLowerCase,
            phoneNumber: null,
          }),
        );
      }
    } else {
      const phoneNumber = `${selectedCountry.iddCode}${phone}`;
      const success = await magicLink.loginUserPhoneNumber(phoneNumber);
      if (success) {
        if (!usersInfo[phoneNumber]?.profileFilled) {
          navigation.navigate('ClaimNickname');
        } else if (!usersInfo[phoneNumber]?.welcomeSeen) {
          navigation.navigate('Welcome');
        }
        dispatch(
          AuthActions.STORE_USER_DATA.STATE.create({
            email: null,
            phoneNumber,
          }),
        );
      }
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
    let response: {success: boolean; authInfo: null | OAuthRedirectResult} = {
      success: false,
      authInfo: null,
    };
    switch (type) {
      case ESocialType.apple:
        response = await magicLink.socialLogin('apple');
        break;
      case ESocialType.facebook:
        response = await magicLink.socialLogin('facebook');
        break;
      case ESocialType.google:
        response = await magicLink.socialLogin('google');
        break;
      case ESocialType.twitter:
        break;

      default:
        break;
    }
    if (response.success) {
      if (
        !usersInfo[`${response.authInfo?.oauth.userInfo.email}`]?.profileFilled
      ) {
        navigation.navigate('ClaimNickname');
      } else if (
        !usersInfo[`${response.authInfo?.oauth.userInfo.email}`]?.welcomeSeen
      ) {
        navigation.navigate('Welcome');
      }
      dispatch(
        AuthActions.STORE_USER_DATA.STATE.create({
          email: response.authInfo?.oauth.userInfo.email,
          phoneNumber: null,
        }),
      );
    }
  };

  const showCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(true);
  };
  const hideCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(false);
  };

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
                placeholderColor={COLORS.greyBorder}
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
