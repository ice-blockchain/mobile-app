// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {ClockIcon} from '@svg/ClockIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {Duration} from 'dayjs/plugin/duration';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  emotion: AuthEmotion;
  countDownSecs: Duration;
};

function getEmotionImage(emotion: AuthEmotion) {
  switch (emotion) {
    case 'anger':
      return Images.emotions.anger;
    default:
      return Images.emotions.anger;
  }
}

function getEmotionTranslation(emotion: AuthEmotion) {
  switch (emotion) {
    case 'anger':
      return t('face_auth.emotions_recognition.emotions.anger');
    case 'contempt':
      return t('face_auth.emotions_recognition.emotions.contempt');
    case 'disgust':
      return t('face_auth.emotions_recognition.emotions.disgust');
    case 'fear':
      return t('face_auth.emotions_recognition.emotions.fear');
    case 'happiness':
      return t('face_auth.emotions_recognition.emotions.happiness');
    case 'neutral':
      return t('face_auth.emotions_recognition.emotions.neutral');
    case 'sadness':
      return t('face_auth.emotions_recognition.emotions.sadness');
    case 'surprise':
      return t('face_auth.emotions_recognition.emotions.surprise');
    default:
      return '';
  }
}

export function EmotionCard({emotion, countDownSecs}: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={getEmotionImage(emotion)}
      />
      <View style={styles.dataContainer}>
        <View style={styles.countDownContainer}>
          <ClockIcon
            width={rem(16)}
            height={rem(16)}
            color={COLORS.secondaryPale}
          />
          <Text style={styles.countDownText}>
            {`${countDownSecs.seconds()}${t('general.seconds_short')}`}
          </Text>
        </View>
        <Text style={styles.emotionText}>{getEmotionTranslation(emotion)}</Text>
        <Text style={styles.descriptionText}>
          {t('face_auth.emotions_recognition.please_show_this')}
        </Text>
      </View>
    </View>
  );
}

const IMAGE_SIZE = rem(120);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rem(16),
    width: '100%',
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    paddingVertical: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: rem(20),
    marginHorizontal: rem(12),
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataContainer: {
    justifyContent: 'center',
    paddingRight: rem(12),
  },
  countDownText: {
    marginStart: rem(6),
    ...font(14, 18, 'medium', 'secondaryPale'),
  },
  emotionText: {
    ...font(24, 34, 'bold', 'codeFieldText'),
    textTransform: 'capitalize',
  },
  descriptionText: {
    ...font(13, 19, 'medium', 'primaryLight'),
  },
});