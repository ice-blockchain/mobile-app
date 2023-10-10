// SPDX-License-Identifier: ice License 1.0

import {CheckBox} from '@components/CheckBox';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/constants';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {PopUpButton} from '@screens/Modals/PopUp/components/PopUpButton';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  updateKycStepPassed: () => void;
};

export function UserConsent({updateKycStepPassed}: Props) {
  const navigation = useNavigation();
  const [isAgreeWithTermsAndConditions, setIsAgreeWithTermsAndConditions] =
    useState(false);
  const onContinue = () => {
    navigate({
      name: 'PopUp',
      params: {
        title: t('face_auth.title'),
        message: <Message text={t('face_auth.confirmation')} />,
        buttons: [
          {
            text: t('button.cancel'),
            preset: 'outlined',
          },
          {
            text: t('button.continue'),
            onPress: updateKycStepPassed,
          },
        ],
        dismissOnAndroidHardwareBack: false,
        dismissOnOutsideTouch: false,
      },
    });
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image source={Images.badges.faceAuth} />
      </View>
      <Text style={styles.title}>{t('face_auth.title')}</Text>
      <Text style={styles.description}>
        {replaceString(
          t('face_auth.description'),
          tagRegex('bold', false),
          (match, index) => (
            <Text key={match + index} style={styles.bold}>
              {match}
            </Text>
          ),
        )}
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
    paddingTop: SCREEN_SIDE_OFFSET,
    ...font(24, 34, 'black', 'primaryDark', 'center'),
  },
  description: {
    paddingTop: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(48),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  bold: {
    ...font(14, 20, 'bold', 'secondary', 'center'),
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
