// SPDX-License-Identifier: ice License 1.0

import {BulletDescription} from '@components/BulletDescription';
import {PopUpButton} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useStartQuiz} from '@screens/QuizFlow/QuizTheme/hooks/useStartQuiz';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const QuizTheme = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();

  const {startQuiz, cancelQuiz, startQuizLoading} = useStartQuiz();

  return (
    <View style={commonStyles.flexOne}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.title')}
        onGoBack={cancelQuiz}
        preventDefaultAction={true}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.title}>{t('quiz.title')}</Text>
        <Text style={styles.subtitle}>{t('quiz.theme.knowledge_check')}</Text>
        <View style={styles.bulletsContainer}>
          {points.map((point, index) => (
            <BulletDescription
              text={point}
              style={styles.bulletContainer}
              textStyle={styles.bulletText}
              bulletStyle={styles.bullet}
              key={index}
            />
          ))}
        </View>
        <Text style={styles.subtitle}>{t('quiz.theme.why_quiz')}</Text>
        <Text style={styles.whyQuizDescription}>
          {t('quiz.theme.why_quiz_description')}
        </Text>
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PopUpButton
          text={t('button.not_now')}
          preset="outlined"
          onPress={cancelQuiz}
          style={styles.button}
        />
        <PopUpButton
          text={t('button.start')}
          onPress={startQuiz}
          style={styles.button}
          disabled={startQuizLoading}
          loading={startQuizLoading}
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
    ...font(24, 30, 'bold', 'primaryDark', 'left'),
    marginTop: rem(24),
  },
  contentContainer: {
    paddingHorizontal: rem(16),
    paddingBottom: rem(20),
    flexGrow: 1,
  },
  subtitle: {
    ...font(17, 21, 'bold', 'primaryDark', 'left'),
    marginTop: rem(24),
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
  bulletsContainer: {
    marginTop: rem(4),
  },
  bulletContainer: {
    marginTop: rem(12),
  },
  bullet: {
    backgroundColor: COLORS.emperor,
  },
  whyQuizDescription: {
    ...font(14, 18, 'medium', 'secondary', 'left'),
    marginTop: rem(16),
  },
  bulletText: {
    color: COLORS.secondary,
  },
  link: {
    ...font(14, 18, 'medium', 'socialLink'),
  },
});

const points = [
  t('quiz.theme.point1'),
  t('quiz.theme.point2'),
  t('quiz.theme.point3'),
  replaceString(
    t('quiz.theme.point4'),
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
