// SPDX-License-Identifier: BUSL-1.1

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem, font, isIOS} from 'rn-units';

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
import {magicLink} from '@services/magicLink';
import {useDispatch, useSelector} from 'react-redux';
import AuthActions from '@store/modules/Auth/actions';
import {RootState} from '@store/rootReducer';
import PhoneNumberInput from '@components/PhoneNumberInput';
import {phoneNumberCountries} from '@constants/countries';
import PhoneNumberSearch from '@components/PhoneNumberSearch';

const SignIn = ({navigation}) => {
  const [email, onChangeEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    phoneNumberCountries[0],
  );
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const usersInfo = useSelector((state: RootState) => state.auth.usersInfo);

  const onSignIn = async () => {
    Keyboard.dismiss();
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
        }),
      );
    }
  };
  const onPhonePress = () => {
    if (inputType === 'email') {
      setInputType('phone');
    } else {
      setInputType('email');
    }
  };
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
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps={'handled'}
            keyboardDismissMode={'none'}>
            <View style={styles.logo}>
              <LogoSvg />
            </View>

            <View>
              <Text style={styles.title}>
                {true
                  ? translate('signIn.welcome')
                  : translate('signIn.welcomeBack')}
              </Text>
            </View>

            <View style={{flex: 1}}>
              {inputType === 'email' ? (
                <CommonInput
                  icon={<EmailSvg />}
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
                />
              )}

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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    color: '#B6B4BA',
  },
  phoneNumberSeatch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default SignIn;
