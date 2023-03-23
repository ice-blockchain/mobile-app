// SPDX-License-Identifier: ice License 1.0

import {FullScreenLoading} from '@components/FullScreenLoading';
import {EmailInput} from '@components/Inputs/EmailInput';
import {PhoneNumberInput} from '@components/Inputs/PhoneNumberInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {COLORS} from '@constants/colors';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Divider} from '@screens/AuthFlow/SignIn/components/Divider';
import {Header} from '@screens/AuthFlow/SignIn/components/Header';
import {SocialButtons} from '@screens/AuthFlow/SignIn/components/SocialButtons';
import {SOCIAL_BUTTON_SIZE} from '@screens/AuthFlow/SignIn/components/SocialButtons/components/SocialButton';
import {SubmitButton} from '@screens/AuthFlow/SignIn/components/SubmitButton';
import {Tab, Tabs} from '@screens/AuthFlow/SignIn/components/Tabs';
import {useEmailAuth} from '@screens/AuthFlow/SignIn/hooks/useEmailAuth';
import {usePhoneAuth} from '@screens/AuthFlow/SignIn/hooks/usePhoneAuth';
import {useSocialAuth} from '@screens/AuthFlow/SignIn/hooks/useSocialAuth';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const SignIn = () => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();
  const {isSocialAuthLoading} = useSocialAuth();
  const {
    phoneNumberBody,
    onChangePhone,
    signInWithPhoneNumber,
    isPhoneAuthLoading,
    phoneAuthFailedReason,
  } = usePhoneAuth();
  const {
    email,
    setEmail,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
  } = useEmailAuth();
  const [activeTab, setActiveTab] = useState<Tab>('email');

  return (
    <KeyboardAvoider keyboardVerticalOffset={rem(15) - SOCIAL_BUTTON_SIZE}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        keyboardShouldPersistTaps={'handled'}
        ref={scrollRef}
        bounces={false}>
        <View style={styles.body}>
          <Header />
          <Tabs
            onSelect={setActiveTab}
            selected={activeTab}
            containerStyle={styles.tabs}
          />
          <View style={styles.input}>
            {activeTab === 'email' ? (
              <EmailInput
                value={email}
                onChangeText={setEmail}
                errorText={emailAuthFailedReason}
                editable={!isEmailAuthLoading}
              />
            ) : (
              <PhoneNumberInput
                value={phoneNumberBody}
                onChangePhone={onChangePhone}
                errorText={phoneAuthFailedReason}
                editable={!isPhoneAuthLoading}
              />
            )}
          </View>
          <SubmitButton
            onPress={
              activeTab === 'phone' ? signInWithPhoneNumber : signInWithEmail
            }
            loading={isPhoneAuthLoading || isEmailAuthLoading}
          />
          <Divider />
          <SocialButtons />
        </View>
        <PrivacyTerms />
      </ScrollView>
      {isSocialAuthLoading && <FullScreenLoading />}
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryLight,
  },
  containerContent: {
    flexGrow: 1,
  },
  body: {
    paddingBottom: 2000,
    marginBottom: -2000,
    backgroundColor: COLORS.white,
  },
  tabs: {
    marginTop: rem(36),
  },
  input: {
    marginTop: rem(30),
    marginHorizontal: rem(20),
  },
});
