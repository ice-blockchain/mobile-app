// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {CheckBox} from '@components/CheckBox';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useNavigation} from '@react-navigation/native';
import {useAgreeWithTerms} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/AccountConfirmation/hooks/useAgreeWithTerms';
import {
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/constants';
import {AccountActions} from '@store/modules/Account/actions';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export function AccountConfirmation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {agreeWithTerms} = useAgreeWithTerms();
  const [isAgreeWithTermsAndConditions, setIsAgreeWithTermsAndConditions] =
    useState(false);

  const onContinue = () => {
    agreeWithTerms();
  };

  const onBack = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
    dispatch(AccountActions.MIGRATE_PHONE_NUMBER_TO_EMAIL.RESET.create());
    navigation.goBack();
  };

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('account_confirmation.title')}
        backgroundColor={'transparent'}
        onGoBack={onBack}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={Images.badges.faceAuth} />
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
                    onPress={() =>
                      openLinkWithInAppBrowser({url: LINKS.TERMS})
                    }>
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
              onPress={onBack}
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
    </View>
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
    paddingTop: rem(8),
    ...font(24, 34, 'black', 'primaryDark', 'center'),
  },
  description: {
    paddingTop: rem(16),
    paddingHorizontal: rem(48),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    paddingBottom: rem(40),
    paddingTop: rem(22),
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
