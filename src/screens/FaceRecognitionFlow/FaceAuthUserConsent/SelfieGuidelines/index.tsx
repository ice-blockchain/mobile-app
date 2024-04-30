// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {CheckBox} from '@components/CheckBox';
import {Warning} from '@components/Warning';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import {GuidelinesCheckList} from '@screens/FaceRecognitionFlow/components/GuidelinesCheckList';
import {
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/constants';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onStepComplete: () => void;
};

export function SelfieGuidelines({onStepComplete}: Props) {
  const navigation = useNavigation();
  const [confirmed, setConfirmed] = useState(false);
  return (
    <View style={commonStyles.flexOne}>
      <ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={Images.badges.faceAuth} />
        </View>
        <Text style={styles.title}>
          {t('face_auth.selfie_guidelines.title')}
        </Text>
        <Text style={styles.description}>
          {t('face_auth.selfie_guidelines.instruction')}
        </Text>
        <GuidelinesCheckList containerStyle={styles.checkList} />
        <Warning
          text={t('face_auth.selfie_guidelines.warning')}
          containerStyle={styles.warning}
        />
        <View style={styles.footerContainer}>
          <View style={styles.checkboxRow}>
            <CheckBox checked={confirmed} onValueChange={setConfirmed} />
            <Text style={styles.noteText}>
              {t('face_auth.selfie_guidelines.confirmation')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <PopUpButton
          text={t('button.cancel')}
          preset={'outlined'}
          style={styles.button}
          onPress={navigation.goBack}
        />
        <PopUpButton
          text={t('button.continue')}
          disabled={!confirmed}
          icon={<FaceAuthIcon />}
          style={[confirmed ? styles.button : styles.disabledButton]}
          onPress={onStepComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
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
    ...font(14, 20, 'medium', 'secondary'),
  },
  checkList: {
    marginTop: rem(12),
  },
  warning: {
    marginTop: rem(16),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: rem(56),
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
  buttonsContainer: {
    paddingTop: rem(12),
    paddingBottom: rem(34),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
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
