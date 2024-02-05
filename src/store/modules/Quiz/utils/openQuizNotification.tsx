// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {navigate} from '@navigation/utils';
import {ClockIcon} from '@svg/ClockIcon';
import {RestartIcon} from '@svg/RestartIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const openQuizNotification = ({
  retries,
  daysLeft,
}: {
  retries: number;
  daysLeft: number;
}) => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  navigate({
    name: 'PopUp',
    key: 'quiz-notification-popup',
    params: {
      imageProps: {source: Images.quiz.quiz},
      imageStyle: styles.image,
      title: t('quiz.action'),
      message: (
        <View style={styles.message}>
          <Text style={styles.messageText}>{t('quiz.reminder')}</Text>
          <View style={styles.quizData}>
            <View style={styles.subtitleRow}>
              <RestartIcon
                color={COLORS.secondary}
                width={rem(16)}
                height={rem(16)}
                style={styles.retriesIcon}
              />
              <Text style={styles.quizDataText}>
                {t('quiz.retries_left', {number: retries ?? 0})}
              </Text>
            </View>
            <View style={styles.subtitleRow}>
              <ClockIcon
                color={COLORS.secondary}
                width={rem(12)}
                height={rem(12)}
                style={styles.timeLeftIcon}
              />
              <Text style={styles.quizDataText}>
                {t('quiz.days_left', {days: daysLeft})}
              </Text>
            </View>
          </View>
        </View>
      ),
      buttons: [
        {
          text: t('button.continue'),
          onPress: () => navigate({name: 'QuizIntro', params: undefined}),
        },
      ],
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  message: {
    marginTop: rem(16),
    marginHorizontal: rem(40),
  },
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  quizData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(12),
    justifyContent: 'center',
  },
  quizDataText: {
    ...font(14, 17, 'medium', 'secondary', 'center'),
  },
  image: {
    marginBottom: rem(20),
  },
  subtitleRow: {
    marginTop: rem(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rem(24),
  },
  retriesIcon: {
    marginTop: rem(2),
    marginRight: rem(3),
  },
  timeLeftIcon: {
    marginRight: rem(6),
  },
});
