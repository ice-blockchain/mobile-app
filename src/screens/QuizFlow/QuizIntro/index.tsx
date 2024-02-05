// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BulletDescription} from '@screens/QuizFlow/QuizIntro/components/BulletDescription';
import {PrivacyTerms} from '@screens/QuizFlow/QuizIntro/components/PrivacyTerms';
import {useSetQuizTerms} from '@screens/QuizFlow/QuizIntro/hooks/useSetQuizTerms';
import {useStartQuiz} from '@screens/QuizFlow/QuizIntro/hooks/useStartQuiz';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';
export const QuizIntro = () => {
  useFocusStatusBar({style: 'dark-content'});

  const {shadowStyle} = useScrollShadow();

  const {termsAccepted, setTermsAccepted} = useSetQuizTerms();

  const {startQuiz, startQuizLoading} = useStartQuiz();

  return (
    <View style={commonStyles.flexOne}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.title')}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.subtitle}>{t('quiz.title')}</Text>
        <Text style={[styles.sectionBody, styles.sectionText]}>
          {t('quiz.intro.description')}
        </Text>
        <Text style={styles.subtitle}>
          {t('quiz.intro.knowledge_check.title')}
        </Text>
        <Text style={[styles.sectionBody, styles.sectionText]}>
          {t('quiz.intro.knowledge_check.description')}
        </Text>
        {knowledgeCheckPoints.map((point, index) => (
          <BulletDescription text={point} key={`kc_${index}`} />
        ))}
        <Text style={styles.subtitle}>{t('quiz.intro.why_quiz.title')}</Text>
        <Text style={[styles.sectionBody, styles.sectionText]}>
          {t('quiz.intro.why_quiz.description')}
        </Text>
        <Text style={styles.subtitle}>
          {t('quiz.intro.community_engagement.title')}
        </Text>
        <Text style={[styles.sectionBody, styles.sectionText]}>
          {t('quiz.intro.community_engagement.description')}
        </Text>
        {communityEngagementPoints.map((point, index) => (
          <BulletDescription text={point} key={`ce_${index}`} />
        ))}
        <Text style={[styles.sectionBody, styles.sectionText]}>
          {t('quiz.intro.community_engagement.bottom_description')}
        </Text>
        <PrivacyTerms
          onCheckBoxPress={setTermsAccepted}
          termsAccepted={termsAccepted}
        />
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PrimaryButton
          text={t('button.start')}
          onPress={startQuiz}
          disabled={!termsAccepted || startQuizLoading}
          loading={startQuizLoading}
          style={styles.button}
          textStyle={styles.buttonText}
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
  contentContainer: {
    paddingHorizontal: rem(16),
    paddingBottom: rem(20),
    flexGrow: 1,
  },
  subtitle: {
    ...font(24, 34, 'bold', 'primaryDark', 'left'),
    marginTop: rem(30),
  },
  buttonsContainer: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
    paddingBottom: rem(34),
    paddingHorizontal: rem(16),
  },
  sectionBody: {
    marginTop: rem(16),
  },
  sectionText: {
    ...font(14, 18, 'medium', 'secondary', 'left'),
  },
  link: {
    color: COLORS.socialLink,
  },
  button: {
    height: rem(40),
    borderRadius: rem(16),
  },
  buttonText: {
    ...font(14, 17, 'black'),
  },
});

const knowledgeCheckPoints = [
  t('quiz.intro.knowledge_check.point1'),
  t('quiz.intro.knowledge_check.point2'),
  t('quiz.intro.knowledge_check.point3'),
  t('quiz.intro.knowledge_check.point4'),
  t('quiz.intro.knowledge_check.point5'),
  replaceString(
    t('quiz.intro.knowledge_check.point6'),
    tagRegex('link', false),
    (match, index) => {
      return (
        <Text
          key={match + index}
          style={styles.link}
          onPress={() => openLinkWithInAppBrowser({url: LINKS.KNOWLEDGE_BASE})}>
          {match}
        </Text>
      );
    },
  ),
];

const communityEngagementPoints = [
  t('quiz.intro.community_engagement.point1'),
  t('quiz.intro.community_engagement.point2'),
  t('quiz.intro.community_engagement.point3'),
];
