// SPDX-License-Identifier: ice License 1.0

import {FullScreenLoading} from '@components/FullScreenLoading';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {COLORS} from '@constants/colors';
import {isEmailLinkSignIn} from '@constants/featureFlags';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {AuthStackParamList} from '@navigation/Auth';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Header} from '@screens/AuthFlow/SignIn/components/Header';
import {SocialButtons} from '@screens/AuthFlow/SignIn/components/SocialButtons';
import {SOCIAL_BUTTON_SIZE} from '@screens/AuthFlow/SignIn/components/SocialButtons/components/SocialButton';
import {Tab, Tabs} from '@screens/AuthFlow/SignIn/components/Tabs';
import {ResetPasswordForm} from '@screens/AuthFlow/SignIn/forms/ResetPasswordForm';
import {SignInEmailLinkForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailLinkForm';
import {SignInEmailPasswordForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailPasswordForm';
import {SignInPhoneForm} from '@screens/AuthFlow/SignIn/forms/SignInPhoneForm';
import {useSocialAuth} from '@screens/AuthFlow/SignIn/hooks/useSocialAuth';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const SignIn = () => {
  useFocusStatusBar({style: 'light-content'});

  const {params} = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();
  const isResetPassword = params?.flow === 'resetPassword';

  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {isSocialAuthLoading} = useSocialAuth();

  const [activeTab, setActiveTab] = useState<Tab>('email');

  const Form = useMemo(() => {
    if (isResetPassword) {
      return ResetPasswordForm;
    }

    if (activeTab === 'phone') {
      return SignInPhoneForm;
    }

    if (isEmailLinkSignIn) {
      return SignInEmailLinkForm;
    } else {
      return SignInEmailPasswordForm;
    }
  }, [activeTab, isResetPassword]);

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
            hiddenTab={isResetPassword ? 'phone' : null}
            containerStyle={styles.tabs}
          />
          <View style={styles.form}>
            <Form />
          </View>
          {!isResetPassword && <SocialButtons />}
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
  form: {
    marginTop: rem(20),
    marginHorizontal: rem(20),
  },
});
