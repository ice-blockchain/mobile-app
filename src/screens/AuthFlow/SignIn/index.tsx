// SPDX-License-Identifier: ice License 1.0

import {FullScreenLoading} from '@components/FullScreenLoading';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/AuthFlow/SignIn/components/Header';
import {SOCIAL_BUTTON_SIZE} from '@screens/AuthFlow/SignIn/components/SocialButtons/components/SocialButton';
import {SignInEmailCodeForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailCodeForm';
import {SignInEmailLinkForm} from '@screens/AuthFlow/SignIn/forms/SignInEmailLinkForm';
import {useIsEmailCodeFlow} from '@screens/AuthFlow/SignIn/hooks/useIsEmailCodeFlow';
import {useSocialAuth} from '@screens/AuthFlow/SignIn/hooks/useSocialAuth';
import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const SignIn = () => {
  useFocusStatusBar({style: 'light-content'});

  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {isSocialAuthLoading} = useSocialAuth();

  const isEmailCodeFlow = useIsEmailCodeFlow();

  const Form = useMemo(() => {
    if (isEmailCodeFlow) {
      return SignInEmailCodeForm;
    }

    return SignInEmailLinkForm;
  }, [isEmailCodeFlow]);

  return (
    <KeyboardAvoider keyboardVerticalOffset={rem(15) - SOCIAL_BUTTON_SIZE}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        keyboardShouldPersistTaps={'handled'}
        ref={scrollRef}
        bounces={false}>
        <Header />
        <View style={styles.form}>
          <Form />
        </View>
        <View style={commonStyles.flexOne} />
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
    backgroundColor: COLORS.white,
  },
  form: {
    marginTop: rem(98),
    marginHorizontal: rem(20),
  },
  privacy: {
    marginTop: rem(24),
    marginBottom: rem(12),
  },
});
