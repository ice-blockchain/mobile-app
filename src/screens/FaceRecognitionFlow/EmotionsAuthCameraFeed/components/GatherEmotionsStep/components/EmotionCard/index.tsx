// SPDX-License-Identifier: ice License 1.0

import {AuthEmotion} from '@api/faceRecognition/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {EMOTION_IMAGE_SIZE} from '@screens/FaceRecognitionFlow/constants';
import {ClockIcon} from '@svg/ClockIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import {Duration} from 'dayjs/plugin/duration';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  emotion: AuthEmotion;
  countDownSecs: Duration;
  previewTimeInMs: number;
};

function getEmotionImage({
  emotion,
  showPreview,
}: {
  emotion: AuthEmotion;
  showPreview: boolean;
}) {
  return showPreview
    ? Images.emotions[`${emotion}_preview`]
    : Images.emotions[emotion];
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

export function EmotionCard({emotion, countDownSecs, previewTimeInMs}: Props) {
  const [showPreview, setShowPreview] = useState(true);
  useEffect(() => {
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), previewTimeInMs);
  }, [emotion, previewTimeInMs]);

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, styles.image]}>
        <Image
          fadeDuration={0}
          style={styles.image}
          resizeMode={'contain'}
          source={getEmotionImage({emotion, showPreview: true})}
        />
        {showPreview ? null : (
          <Image
            fadeDuration={0}
            style={[styles.image, StyleSheet.absoluteFill]}
            resizeMode={'contain'}
            source={getEmotionImage({emotion, showPreview: false})}
          />
        )}
      </View>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: rem(16),
    backgroundColor: COLORS.white,
    paddingVertical: rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: rem(20),
    marginHorizontal: rem(12),
  },
  image: {
    width: EMOTION_IMAGE_SIZE,
    height: EMOTION_IMAGE_SIZE,
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
    ...font(24, 34, 'bold', 'gunmetalGrey'),
    textTransform: 'capitalize',
  },
  descriptionText: {
    ...font(13, 19, 'medium', 'primaryLight'),
  },
});
