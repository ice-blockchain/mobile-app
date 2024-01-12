// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {CheckBox} from '@components/CheckBox';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import {
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/constants';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  updateKycStepPassed?: () => void;
};

export function AccountConfirmation({updateKycStepPassed}: Props) {
  const navigation = useNavigation();
  const [isAgreeWithTermsAndConditions, setIsAgreeWithTermsAndConditions] =
    useState(false);

  const onContinue = () => {
    updateKycStepPassed?.();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={Images.auth.accountConfirmation} />
      </View>
      <Text style={styles.title}>{t('account_confirmation.title')}</Text>
      <Text style={styles.description}>
        {t('account_confirmation.description')}
      </Text>
      <Text style={styles.description}>
        {t('account_confirmation.description')}
      </Text>
      <View style={styles.footerContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox
            checked={isAgreeWithTermsAndConditions}
            onValueChange={setIsAgreeWithTermsAndConditions}
          />
          <Text style={styles.noteText}>
            {replaceString(
              t('face_auth.consent'),
              tagRegex('link', false),
              (match, index) => (
                <Text
                  key={match + index}
                  style={styles.termsLink}
                  onPress={() => openLinkWithInAppBrowser({url: LINKS.TERMS})}>
                  {match}
                </Text>
              ),
            )}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <PopUpButton
            text={t('button.cancel')}
            preset={'outlined'}
            style={styles.button}
            onPress={navigation.goBack}
          />
          <PopUpButton
            text={t('button.continue')}
            disabled={!isAgreeWithTermsAndConditions}
            icon={<FaceAuthIcon />}
            style={[
              isAgreeWithTermsAndConditions
                ? styles.button
                : styles.disabledButton,
            ]}
            onPress={onContinue}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: rem(20),
  },
  title: {
    paddingTop: 10,
    ...font(24, 34, 'black', 'primaryDark', 'center'),
  },
  description: {
    paddingTop: 16,
    paddingHorizontal: rem(48),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    paddingBottom: rem(40),
  },
  checkboxRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  noteText: {
    paddingHorizontal: rem(12),
    ...font(14, 18, 'medium', 'primaryDark'),
  },
  termsLink: {
    color: COLORS.primaryLight,
  },
  buttonsContainer: {
    paddingTop: rem(34),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_WIDTH,
  },
  disabledButton: {
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
});
