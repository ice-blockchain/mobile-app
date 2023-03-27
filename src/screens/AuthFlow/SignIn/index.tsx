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
import {ResetPasswordForm} from '@screens/AuthFlow/SignIn/forms/ResetPasswordForm';
import {SignInEmailLinkForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailLinkForm';
import {SignInEmailPasswordForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailPasswordForm';
import {SignInPhoneForm} from '@screens/AuthFlow/SignIn/forms/SignInPhoneForm';
import {useSocialAuth} from '@screens/AuthFlow/SignIn/hooks/useSocialAuth';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const SignIn = () => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {isSocialAuthLoading} = useSocialAuth();

  const [activeTab, setActiveTab] = useState<Tab>('email');

  const [isResetPassword, setIsResetPassword] = useState(false);

  const emailFlow = 'password';

  const renderForm = () => {
    if (isResetPassword) {
      return <ResetPasswordForm />;
    }

    if (activeTab === 'phone') {
      return <SignInPhoneForm />;
    }

    if (emailFlow === 'password') {
      return (
        <SignInEmailPasswordForm
          onResetPasswordPress={() => setIsResetPassword(true)}
        />
      );
    } else {
      return <SignInEmailLinkForm />;
    }
  };

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
          <View style={styles.form}>{renderForm()}</View>
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
