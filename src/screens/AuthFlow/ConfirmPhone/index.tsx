// SPDX-License-Identifier: ice License 1.0

import {BackButton} from '@components/Buttons/BackButton';
import {ResendButton} from '@components/Buttons/ResendButton';
import {CodeInput} from '@components/Inputs/CodeInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {LottieView} from '@components/LottieView';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {LottieAnimations} from '@lottie';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Description} from '@screens/AuthFlow/ConfirmPhone/components/Description';
import {Header} from '@screens/AuthFlow/ConfirmPhone/components/Header';
import {useConfirmPhone} from '@screens/AuthFlow/ConfirmPhone/hooks/useConfirmPhone';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem, screenHeight} from 'rn-units';

const DEFAULT_BOTTOM_MARGIN = screenHeight * 0.05;

export const ConfirmPhone = () => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {
    code,
    phoneNumber,
    setCode,
    resendCode,
    resetValidation,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
  } = useConfirmPhone();

  return (
    <KeyboardAvoider>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        ref={scrollRef}
        bounces={false}>
        <View style={styles.flex}>
          <Header />
          <Description phone={phoneNumber} />
          <CodeInput
            autoFocus={true}
            containerStyle={styles.input}
            value={code}
            setValue={setCode}
            errorText={validationError}
            editable={!validateLoading}
            validated={isSuccessValidation}
          />
          <ResendButton
            onResend={resendCode}
            containerStyle={styles.resendButton}
            lastSendTimestamp={smsSentTimestamp}
          />

          <View style={styles.animation}>
            {validateLoading && (
              <LottieView
                style={styles.animation}
                source={LottieAnimations.loadingLogoBlue}
                autoPlay={true}
                loop={true}
              />
            )}
          </View>
          <View style={styles.privacyContainer}>
            <PrivacyTerms />
          </View>
        </View>
      </ScrollView>
      <BackButton onPress={resetValidation} />
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  input: {
    marginTop: rem(30),
    marginHorizontal: rem(22),
  },
  resendButton: {
    marginBottom: DEFAULT_BOTTOM_MARGIN,
    marginTop: rem(20),
  },
  privacyContainer: {
    marginVertical: DEFAULT_BOTTOM_MARGIN,
  },
  animation: {
    width: rem(69),
    height: rem(69),
    alignSelf: 'center',
  },
});
