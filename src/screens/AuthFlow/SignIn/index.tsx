// SPDX-License-Identifier: ice License 1.0

import {FullScreenLoading} from '@components/FullScreenLoading';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {COLORS} from '@constants/colors';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/AuthFlow/SignIn/components/Header';
import {SocialButtons} from '@screens/AuthFlow/SignIn/components/SocialButtons';
import {SOCIAL_BUTTON_SIZE} from '@screens/AuthFlow/SignIn/components/SocialButtons/components/SocialButton';
import {Tab, Tabs} from '@screens/AuthFlow/SignIn/components/Tabs';
import {SignInEmailCodeForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailCodeForm';
import {SignInEmailLinkForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailLinkForm';
import {SignInPhoneForm} from '@screens/AuthFlow/SignIn/forms/SignInPhoneForm';
import {useIsEmailCodeFlow} from '@screens/AuthFlow/SignIn/hooks/useIsEmailCodeFlow';
import {useSocialAuth} from '@screens/AuthFlow/SignIn/hooks/useSocialAuth';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const SignIn = () => {
  useFocusStatusBar({style: 'light-content'});

  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {isSocialAuthLoading} = useSocialAuth();

  const [activeTab, setActiveTab] = useState<Tab>('email');

  const isEmailCodeFlow = useIsEmailCodeFlow();

  const Form = useMemo(() => {
    if (activeTab === 'phone') {
      return SignInPhoneForm;
    }

    if (isEmailCodeFlow) {
      return SignInEmailCodeForm;
    }

    return SignInEmailLinkForm;
  }, [activeTab, isEmailCodeFlow]);

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
          <View style={styles.form}>
            <Form />
          </View>
          <SocialButtons />
        </View>
        <PrivacyTerms containerStyle={styles.privacy} />
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
  form: {
    marginTop: rem(20),
    marginHorizontal: rem(20),
  },
  privacy: {
    marginTop: rem(24),
    marginBottom: rem(12),
  },
});
