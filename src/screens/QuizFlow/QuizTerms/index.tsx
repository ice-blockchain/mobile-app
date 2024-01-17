// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useCancelQuiz} from '@screens/QuizFlow/hooks/useCancelQuiz';
import {InfoBlock} from '@screens/QuizFlow/QuizTerms/components/InfoBlock';
import {PrivacyTerms} from '@screens/QuizFlow/QuizTerms/components/PrivacyTerms';
import {useNavigateNextStep} from '@screens/QuizFlow/QuizTerms/hooks/useNavigateNextStep';
import {useSetQuizTerms} from '@screens/QuizFlow/QuizTerms/hooks/useSetQuizTerms';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const QuizTerms = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();

  const {
    termsAccepted,
    setTermsAccepted,
    saveTermsAccepted,
    isSaveTermsAcceptedLoading,
  } = useSetQuizTerms();

  const {cancelQuiz} = useCancelQuiz();

  useOnHardwareBack({callback: cancelQuiz, preventDefault: true});

  useNavigateNextStep();

  return (
    <View style={commonStyles.flexOne}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.title')}
      />
      <ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.title}>{t('quiz.title')}</Text>
        <Text style={styles.description}>{t('quiz.terms.description')}</Text>
        <InfoBlock
          title={t('quiz.terms.knowledge_verification.title')}
          description={t('quiz.terms.knowledge_verification.description')}
          points={[
            t('quiz.terms.knowledge_verification.point1'),
            t('quiz.terms.knowledge_verification.point2'),
            t('quiz.terms.knowledge_verification.point3'),
          ]}
        />
        <InfoBlock
          title={t('quiz.terms.community_engagement.title')}
          description={t('quiz.terms.community_engagement.description')}
          points={[
            t('quiz.terms.community_engagement.point1'),
            t('quiz.terms.community_engagement.point2'),
            t('quiz.terms.community_engagement.point3'),
          ]}
          bottomDescription={t(
            'quiz.terms.community_engagement.bottom_description',
          )}
        />
        <PrivacyTerms
          onCheckBoxPress={setTermsAccepted}
          isAgreeWithTerms={termsAccepted}
        />
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PopUpButton
          text={t('button.not_now')}
          preset="outlined"
          onPress={cancelQuiz}
          style={styles.button}
        />
        <PopUpButton
          text={t('button.continue')}
          onPress={saveTermsAccepted}
          disabled={!termsAccepted || isSaveTermsAcceptedLoading}
          loading={isSaveTermsAcceptedLoading}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginTop: rem(18),
    width: rem(243),
    height: rem(232),
  },
  title: {
    ...font(24, 30, 'black', 'primaryDark', 'left'),
    marginTop: rem(24),
  },
  contentContainer: {
    paddingHorizontal: rem(16),
    paddingBottom: rem(20),
    flexGrow: 1,
  },
  description: {
    ...font(14, 19, 'medium', 'secondary', 'left'),
    marginTop: rem(16),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
    paddingBottom: rem(34),
  },
  button: {
    width: '40%',
  },
});
